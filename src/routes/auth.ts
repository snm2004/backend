import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

const router = express.Router();


router.post('/signup', async (req, res) => {
  try {
      console.log('Signup Route Hit');
      console.log('Request Body:', req.body);

      const { name, email, password } = req.body;
      let user = await User.findOne({ email });

      if (user) {
          console.log('User already exists');
          return res.status(400).json({ msg: 'User already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      user = new User({ name, email, password: hashedPassword });
      await user.save();

      console.log('✅ User created:', user);

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

      res.status(201).json({ token });
  } catch (error) {
      console.error('Signup Error:', error);
      res.status(500).json({ msg: 'Server error', error });
  }
});
