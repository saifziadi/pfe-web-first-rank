import * as mongoose from 'mongoose';

export interface Message extends mongoose.Document {
    readonly _id: string;
    readonly userId: string;
    readonly adminId: string;
    readonly content: string;
}

export const MessageSchema = new mongoose.Schema({
    userId: mongoose.Types.ObjectId,
    adminId: mongoose.Types.ObjectId,
    content: { type: String, default: "" },
    status: { type: Boolean, default: true },
}, { timestamps: true });