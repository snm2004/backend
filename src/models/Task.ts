import { Schema, model, Document, Types } from 'mongoose';

export interface ITask extends Document {
    title: string;
    description: string;
    completed: boolean;
    user: Types.ObjectId;
}

const TaskSchema = new Schema<ITask>({
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export const Task = model<ITask>('Task', TaskSchema);
