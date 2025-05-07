import mongoose from 'mongoose';

export default (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ 
      success: false,
      message: 'Invalid ID format' 
    });
  }
  next();
};