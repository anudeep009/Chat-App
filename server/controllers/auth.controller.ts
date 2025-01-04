import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/user.model';
import jwt from 'jsonwebtoken';

const signup = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password, profileImage } = req.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists please login in' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = new User({
            username,
            password: hashedPassword,
            profileImage
        });

        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error', error });
    }
};

const signin = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            res.status(400).json({ message: 'Invalid username or password' });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: 'Invalid username or password' });
            return;
        }

        // Generate a JWT token
        const token = jwt.sign(
            { username }, 
            process.env.JWT_SECRET || 'anudeepavula', 
            { expiresIn: '1h' }
        );

        const { password: _, ...userWithoutPassword } = user.toObject();

        res.status(200).json({ token, user: userWithoutPassword });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error', error });
    }
};


export { signup, signin };