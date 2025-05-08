import Job from '../models/Job.js';
import User from '../models/User.js';
import { sendEmail } from '../config/email.js';

const createJob = async (req, res) => {
  try {
    const job = new Job({
      postedBy: req.user._id,
      ...req.body,
    });

    const createdJob = await job.save();
    res.status(201).json(createdJob);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ isActive: true })
      .populate('postedBy', 'firstName lastName email')
      .sort({ createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const applyForJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      'postedBy',
      'firstName lastName email'
    );

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const alreadyApplied = job.applicants.some(
      (applicant) => applicant.userId.toString() === req.user._id.toString()
    );

    if (alreadyApplied) {
      return res.status(400).json({ message: 'Already applied for this job' });
    }

    job.applicants.push({
      userId: req.user._id,
      appliedAt: Date.now(),
    });

    await job.save();

    // Notify job poster
    if (job.postedBy.email) {
      const applicant = await User.findById(req.user._id);
      await sendEmail(
        job.postedBy.email,
        'New Job Application',
        `You have a new application for ${job.title} from ${applicant.firstName} ${applicant.lastName}`,
        `<h1>New Job Application</h1>
        <p>You have a new application for ${job.title} from ${applicant.firstName} ${applicant.lastName}</p>`
      );
    }

    res.json({ message: 'Application submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('postedBy', 'firstName lastName email')
      .populate('applicants.userId', 'firstName lastName email');

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateJob = async (req, res) => {
  try {
    const { title, description, requirements, isActive } = req.body;

    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, postedBy: req.user._id },
      { title, description, requirements, isActive },
      { new: true }
    );

    if (!job) {
      return res.status(404).json({ message: 'Job not found or unauthorized' });
    }

    res.json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const closeJob = async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, postedBy: req.user._id },
      { isActive: false },
      { new: true }
    );

    if (!job) {
      return res.status(404).json({ message: 'Job not found or unauthorized' });
    }

    res.json({ message: 'Job closed successfully', job });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getMyPostedJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user._id })
      .sort({ createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const searchJobs = async (req, res) => {
  try {
    const { q, location } = req.query;
    const query = { isActive: true };

    if (q) {
      query.$text = { $search: q };
    }
    if (location) {
      query.location = new RegExp(location, 'i');
    }

    const jobs = await Job.find(query)
      .populate('postedBy', 'firstName lastName')
      .sort({ createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getJobApplications = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('applicants.userId', 'firstName lastName email resume');

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // ✅ Allow admins OR job poster
    const isAdmin = req.user.role === 'admin';
    const isOwner = job.postedBy.toString() === req.user._id.toString();

    if (!isAdmin && !isOwner) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    res.json(job.applicants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


const getMyAppliedJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      'applicants.userId': req.user._id
    }).populate('postedBy', 'company');

    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({}).populate('postedBy');
    res.json(jobs);
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
}

const forceCloseAnyJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    res.json(job);
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
}

const deleteAnyJob = async (req, res) => {
  try {
    const job = await await Job.findByIdAndDelete(req.params.id);
    res.json({ message: 'Job permanently deleted' });
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
}

const getAllApplications = async (req, res) => {
  try {
    const jobs = await Job.find({})
      .populate('postedBy', 'email')
      .populate('applicants.userId', 'firstName lastName');
    res.json(jobs.map(job => job.applicants));
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
}

export { createJob, getJobs, applyForJob, getJobById, updateJob, closeJob, getMyPostedJobs, getMyAppliedJobs, searchJobs, getJobApplications, getAllJobs, forceCloseAnyJob, deleteAnyJob, getAllApplications };