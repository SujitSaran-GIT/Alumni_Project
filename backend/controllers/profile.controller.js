import Profile from '../models/Profile.js';


// Create a profile (task)

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

export { updateProfile, getProfileById };