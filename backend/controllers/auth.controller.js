import User from '../models/User.js';
import { generateToken } from '../config/jwt.js';
import { sendEmail } from '../config/email.js';

const register = async (req, res) => {
  try {
    const { email, password, firstName, lastName, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      email,
      password,
      firstName,
      lastName,
      role,
    });

    const token = generateToken(user._id, user.role);

    // Send welcome email
    await sendEmail(
      email,
      'Welcome to Alumni Portal',
      `Welcome ${firstName}! Your account has been created successfully.`,
      `<h1>Welcome ${firstName}!</h1><p>Your account has been created successfully.</p>`
    );

    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // if (!user || !(await user.matchPassword(password))) {
    //   return res.status(401).json({ message: 'Invalid credentials' });
    // }

    const token = generateToken(user._id, user.role);

    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export { register, login };