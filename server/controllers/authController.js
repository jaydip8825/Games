import User from '../models/User.js';
import bcrypt from 'bcryptjs';

// Login controller
export const login = async (req, res) => {
  const { email, password, role } = req.body;
  
  if (!email || !password || !role) {
    return res.status(400).json({ message: 'All fields required' });
  }
  
  try {
    const user = await User.findOne({
      email,
      role: new RegExp(`^${role}$`, 'i') // Case-insensitive match
    });
    
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    res.status(200).json({
      message: 'Login successful',
      user: {
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong', error: err.message });
  }
};

// Signup controller
export const signup = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role.toLowerCase(),
    });

    await newUser.save();

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
      token: 'dummy-token-123',
    });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong', error: err.message });
  }
};

// Update profile controller
export const updateProfile = async (req, res) => {
  console.log('Update profile request:', req.body);
  console.log('User from middleware:', req.user);
  
  const { name, email } = req.body;
  const userId = req.user._id; // From auth middleware

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  try {
    // Check if email is already taken by another user
    const existingUser = await User.findOne({ email, _id: { $ne: userId } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Update user profile
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Profile updated successfully:', updatedUser);

    res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role
      }
    });
  } catch (err) {
    console.log('Update profile error:', err);
    res.status(500).json({ message: 'Something went wrong', error: err.message });
  }
};
