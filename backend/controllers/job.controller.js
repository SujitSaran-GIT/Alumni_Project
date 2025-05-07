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

export { createJob, getJobs, applyForJob };