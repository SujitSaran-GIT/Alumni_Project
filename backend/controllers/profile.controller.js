import Profile from '../models/Profile.js';


// Create a profile (task)
const createProfile = async (req, res) => {
  try {
    const { education, workExperience, interests, volunteerHistory, isMentor, mentorshipTopics } = req.body;
    const userId = req.user._id; // Assuming `req.user` is set via authentication middleware

    // Check if a profile already exists for this user
    const existingProfile = await Profile.findOne({ userId });
    if (existingProfile) {
      return res.status(400).json({ message: 'Profile already exists. Use update instead.' });
    }

    // Create a new profile
    const newProfile = new Profile({
      userId,
      education,
      workExperience,
      interests,
      volunteerHistory,
      isMentor: isMentor || false, // Default to false if not provided
      mentorshipTopics,
    });

    await newProfile.save();

    res.status(201).json(newProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { education, workExperience, interests, volunteerHistory, isMentor, mentorshipTopics } = req.body;

    const profile = await Profile.findOneAndUpdate(
      { userId: req.user._id },
      {
        education,
        workExperience,
        interests,
        volunteerHistory,
        isMentor,
        mentorshipTopics,
      },
      { new: true, upsert: true }
    );

    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.params.id }).populate(
      'userId',
      'firstName lastName email graduationYear degree'
    );

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getAllProfiles = async (req, res) => {
  try {
    const { isMentor, interest, topic } = req.query;
    const filter = {};
    
    if (isMentor) filter.isMentor = isMentor === 'true';
    if (interest) filter.interests = interest;
    if (topic) filter.mentorshipTopics = topic;

    const profiles = await Profile.find(filter)
      .populate('userId', 'firstName lastName email graduationYear degree')
      .sort({ createdAt: -1 });

    res.json(profiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getAllMentors = async (req, res) => {
  try {
    const mentors = await Profile.find({ isMentor: true })
      .populate('userId', 'firstName lastName email graduationYear degree')
      .sort({ createdAt: -1 });

    res.json(mentors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const toggleMentorStatus = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user._id });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    profile.isMentor = !profile.isMentor;
    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const searchProfiles = async (req, res) => {
  try {
    const { query } = req.query;
    const profiles = await Profile.find({
      $or: [
        { 'education.university': { $regex: query, $options: 'i' } },
        { 'workExperience.company': { $regex: query, $options: 'i' } },
        { 'workExperience.role': { $regex: query, $options: 'i' } },
        { interests: { $regex: query, $options: 'i' } },
        { mentorshipTopics: { $regex: query, $options: 'i' } }
      ]
    }).populate('userId', 'firstName lastName email');

    res.json(profiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const deleteProfile = async (req, res) => {
  try {
    await Profile.findOneAndDelete({ userId: req.user._id });
    res.json({ message: 'Profile deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export { createProfile , getAllProfiles ,updateProfile, getProfileById, getAllMentors, toggleMentorStatus, deleteProfile, searchProfiles };