import User from '../models/User.js';
import Profile from '../models/Profile.js';

const createUserProfile = async (req, res) => {
  try {
    const {
      graduationYear,
      degree,
      avatar,
      phone,
      bio,
      currentJob,
      skills,
      socialLinks,
      privacySettings
    } = req.body;

    // Find the user
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update profile fields
    if (graduationYear !== undefined) user.graduationYear = graduationYear;
    if (degree !== undefined) user.degree = degree;
    if (avatar !== undefined) user.avatar = avatar;
    if (phone !== undefined) user.phone = phone;
    if (bio !== undefined) user.bio = bio;
    
    // Handle nested objects
    if (currentJob) {
      user.currentJob = {
        title: currentJob.title || user.currentJob?.title,
        company: currentJob.company || user.currentJob?.company,
        location: currentJob.location || user.currentJob?.location
      };
    }
    
    if (skills) {
      user.skills = Array.isArray(skills) ? skills : [skills];
    }
    
    if (socialLinks) {
      user.socialLinks = {
        linkedIn: socialLinks.linkedIn || user.socialLinks?.linkedIn,
        github: socialLinks.github || user.socialLinks?.github
      };
    }
    
    if (privacySettings) {
      user.privacySettings = {
        showEmail: privacySettings.showEmail !== undefined 
          ? privacySettings.showEmail 
          : user.privacySettings?.showEmail,
        showPhone: privacySettings.showPhone !== undefined 
          ? privacySettings.showPhone 
          : user.privacySettings?.showPhone
      };
    }

    // Save the updated user
    const updatedUser = await user.save();

    // Return the profile data (excluding sensitive information)
    res.status(200).json({
      success: true,
      profile: {
        graduationYear: updatedUser.graduationYear,
        degree: updatedUser.degree,
        avatar: updatedUser.avatar,
        phone: updatedUser.phone,
        bio: updatedUser.bio,
        currentJob: updatedUser.currentJob,
        skills: updatedUser.skills,
        socialLinks: updatedUser.socialLinks,
        privacySettings: updatedUser.privacySettings,
        lastActive: updatedUser.lastActive
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error creating profile',
      error: error.message
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    const profile = await Profile.findOne({ userId: req.user._id });

    res.json({
      user,
      profile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.firstName = req.body.firstName || user.firstName;
      user.lastName = req.body.lastName || user.lastName;
      user.email = req.body.email || user.email;
      user.graduationYear = req.body.graduationYear || user.graduationYear;
      user.degree = req.body.degree || user.degree;
      user.phone = req.body.phone || user.phone;
      user.bio = req.body.bio || user.bio;
      user.currentJob = req.body.currentJob || user.currentJob;
      user.skills = req.body.skills || user.skills;
      user.socialLinks = req.body.socialLinks || user.socialLinks;
      user.privacySettings = req.body.privacySettings || user.privacySettings;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        user : updatedUser
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Admins can view any user, regular users can only view their own profile
    if (req.user.role !== 'admin' && req.user._id.toString() !== user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this user'
      });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false,
      message: 'Server Error',
      error: error.message 
    });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const userToDelete = await User.findById(req.params.id);

    if (!userToDelete) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Authorization check
    // Admins can delete any user, users can only delete themselves
    if (req.user.role !== 'admin' && req.user._id.toString() !== userToDelete._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this user'
      });
    }

    // Prevent admin from deleting themselves (optional safety check)
    if (userToDelete.role === 'admin' && req.user._id.toString() === userToDelete._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'Admin users cannot delete themselves'
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'User deleted successfully'
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false,
      message: 'Server Error',
      error: error.message 
    });
  }
};

const searchUsers = async (req, res) => {
  try {
    const { q, role, graduationYear, skills } = req.query;
    const query = {};
    
    if (q) {
      query.$or = [
        { firstName: { $regex: q, $options: 'i' } },
        { lastName: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } },
        { 'currentJob.company': { $regex: q, $options: 'i' } }
      ];
    }
    
    if (role) query.role = role;
    if (graduationYear) query.graduationYear = graduationYear;
    if (skills) query.skills = { $in: skills.split(',') };

    const users = await User.find(query).select('-password');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateUserRole = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (!['alumni', 'admin', 'student'].includes(req.body.role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }
    
    user.role = req.body.role;
    await user.save();
    
    res.json({ 
      success: true,
      message: 'User role updated',
      user: {
        _id: user._id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getUserStats = async (req, res) => {
  try {
    const stats = await User.aggregate([
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 },
          latest: { $max: '$createdAt' }
        }
      },
      {
        $project: {
          role: '$_id',
          count: 1,
          latest: 1,
          _id: 0
        }
      }
    ]);
    
    res.json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const bulkUpdateUsers = async (req, res) => {
  try {
    const { ids, updates } = req.body;
    
    if (!ids || !Array.isArray(ids) || !updates) {
      return res.status(400).json({ message: 'Invalid request' });
    }
    
    const result = await User.updateMany(
      { _id: { $in: ids } },
      { $set: updates }
    );
    
    res.json({
      success: true,
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const verifyUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    user.isVerified = true;
    await user.save();
    
    // Send verification email here if needed
    
    res.json({
      success: true,
      message: 'User verified successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Generate and store reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();
    
    // Send email with reset link
    const resetUrl = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;
    // Implement your email sending logic here
    
    res.json({
      success: true,
      message: 'Password reset link sent to email'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateLastActive = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, {
      lastActive: new Date()
    });
    
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const exportUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    
    // Convert to CSV
    const fields = ['_id', 'email', 'firstName', 'lastName', 'role'];
    const csv = json2csv.parse(users, { fields });
    
    res.header('Content-Type', 'text/csv');
    res.attachment('users-export.csv');
    res.send(csv);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export { createUserProfile, getUsers, getUserProfile, updateUserProfile, getUserById, deleteUserById, searchUsers, updateUserRole, getUserStats, bulkUpdateUsers, verifyUser, requestPasswordReset, updateLastActive, exportUsers };