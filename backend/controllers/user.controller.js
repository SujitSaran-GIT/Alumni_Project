import User from '../models/User.js';
import Profile from '../models/Profile.js';
import crypto from 'crypto'
import { Parser } from 'json2csv'

const createUserProfile = async (req, res) => {
  try {
    const {
      graduationYear,
      degree,
      phone,
      bio,
      skills,
      'currentJob.title': title,
      'currentJob.company': company,
      'currentJob.location': location,
      'socialLinks.linkedIn': linkedIn,
      'socialLinks.github': github,
      'privacySettings.showEmail': showEmail,
      'privacySettings.showPhone': showPhone
    } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (graduationYear) user.graduationYear = graduationYear;
    if (degree) user.degree = degree;
    if (phone) user.phone = phone;
    if (bio) user.bio = bio;

    // Set profile pic path
    if (req.file) {
      user.profilePic = `/uploads/profilePics/${req.file.filename}`;
    }

    user.currentJob = {
      title: title || user.currentJob?.title,
      company: company || user.currentJob?.company,
      location: location || user.currentJob?.location
    };

    if (skills) {
      user.skills = typeof skills === 'string' ? skills.split(',') : skills;
    }

    user.socialLinks = {
      linkedIn: linkedIn || user.socialLinks?.linkedIn,
      github: github || user.socialLinks?.github
    };

    user.privacySettings = {
      showEmail: showEmail !== undefined ? showEmail === 'true' : user.privacySettings?.showEmail,
      showPhone: showPhone !== undefined ? showPhone === 'true' : user.privacySettings?.showPhone
    };

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      profile: {
        graduationYear: updatedUser.graduationYear,
        degree: updatedUser.degree,
        profilePic: updatedUser.profilePic,
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
    const {
      firstName,
      lastName,
      email,
      graduationYear,
      degree,
      phone,
      bio,
      password,
      skills,
      'currentJob.title': title,
      'currentJob.company': company,
      'currentJob.location': location,
      'socialLinks.linkedIn': linkedIn,
      'socialLinks.github': github,
      'privacySettings.showEmail': showEmail,
      'privacySettings.showPhone': showPhone
    } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Basic fields
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (graduationYear) user.graduationYear = graduationYear;
    if (degree) user.degree = degree;
    if (phone) user.phone = phone;
    if (bio) user.bio = bio;

    // Profile picture
    if (req.file) {
      user.profilePic = `/uploads/profilePics/${req.file.filename}`;
    }

    // Nested fields
    user.currentJob = {
      title: title || user.currentJob?.title,
      company: company || user.currentJob?.company,
      location: location || user.currentJob?.location
    };

    if (skills) {
      user.skills = typeof skills === 'string' ? skills.split(',') : skills;
    }

    user.socialLinks = {
      linkedIn: linkedIn || user.socialLinks?.linkedIn,
      github: github || user.socialLinks?.github
    };

    user.privacySettings = {
      showEmail: showEmail !== undefined ? showEmail === 'true' : user.privacySettings?.showEmail,
      showPhone: showPhone !== undefined ? showPhone === 'true' : user.privacySettings?.showPhone
    };

    // Password update
    if (password) {
      user.password = password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      user: {
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        role: updatedUser.role,
        profilePic: updatedUser.profilePic,
        graduationYear: updatedUser.graduationYear,
        degree: updatedUser.degree,
        phone: updatedUser.phone,
        bio: updatedUser.bio,
        currentJob: updatedUser.currentJob,
        skills: updatedUser.skills,
        socialLinks: updatedUser.socialLinks,
        privacySettings: updatedUser.privacySettings
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error updating profile',
      error: error.message
    });
  }
};

const getUserByIdForAdmin = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).select('-password'); // exclude password

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    console.error('Admin Get User Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error fetching user',
      error: error.message,
    });
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

    console.log("Email received:", email);
    console.log("User found:", user);

    
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
    const parser = new Parser({ fields });
    const csv = parser.parse(users);
    
    res.header('Content-Type', 'text/csv');
    res.attachment('users-export.csv');
    res.send(csv);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export { createUserProfile, getUsers, getUserProfile, updateUserProfile, getUserById, deleteUserById, searchUsers, updateUserRole, getUserStats, bulkUpdateUsers, verifyUser, requestPasswordReset, updateLastActive, exportUsers, getUserByIdForAdmin };