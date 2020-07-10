import * as mongoose from 'mongoose';

export interface Blog extends mongoose.Document {
    readonly _id: string;
    readonly title: string;
    readonly content: string;
    imageUrl: string;
    readonly status: boolean;
}

export const BlogSchema = new mongoose.Schema({
    title: { type: String, default: "" },
    content: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    status: { type: Boolean, default: true },
}, { timestamps: true });