import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
    user?: any;
}

const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ msg: 'Access Denied. No Token Provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Invalid Token' });
    }
};
export default router;

