import express from 'express';
import { Task } from '../models/Task';
import authenticateJWT, { AuthRequest } from '../middleware/auth';

const router = express.Router();


router.post('/', authenticateJWT, async (req: AuthRequest, res) => {
    try {
        const { title, description } = req.body;
        const task = new Task({ title, description, user: req.user.userId });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});


router.get('/', authenticateJWT, async (req: AuthRequest, res) => {
    try {
        const tasks = await Task.find({ user: req.user.userId });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});


router.put('/:id', authenticateJWT, async (req: AuthRequest, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(task);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});


router.delete('/:id', authenticateJWT, async (req: AuthRequest, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

export default router;
