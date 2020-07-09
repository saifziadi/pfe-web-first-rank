import * as mongoose from 'mongoose';

export interface Message extends mongoose.Document {
    readonly _id: string;
    readonly email: string;
    readonly subject: string;
    readonly content: string;
    readonly status: boolean;
}

export const MessageSchema = new mongoose.Schema({
    email: { type: String, default: "" },
    subject: { type: String, default: "" },
    content: { type: String, default: "" },
    status: { type: Boolean, default: true },
}, { timestamps: true });