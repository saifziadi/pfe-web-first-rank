import * as mongoose from 'mongoose';

export interface Review extends mongoose.Document {
    readonly _id: string;
    readonly userId: string;
    readonly price: number;
    readonly efficiency: number;
    readonly support: number;
    readonly comment: string;
    readonly status: boolean;
}

export const ReviewSchema = new mongoose.Schema({
    price: { type: Number, default: "" },
    efficiency: { type: Number, default: "" },
    support: { type: Number, default: "" },
    comment: { type: String, default: "" },
    userId: mongoose.Types.ObjectId,
    status: { type: Boolean, default: true },
}, { timestamps: true });