import multer from 'multer';
import path from 'path';

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/profiles/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // e.g. 1715193475432.webp
  }
});

const uploaded = multer({ storage });

export default uploaded

// Your PUT route (assuming auth middleware is `protect`)
