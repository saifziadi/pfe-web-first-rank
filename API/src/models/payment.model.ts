import * as mongoose from 'mongoose';

export interface Payement extends mongoose.Document {
    readonly _id: string;
    readonly firstname: string;
    readonly lastname: string;
    readonly imgUrl: string;
    readonly toolId: string;
    readonly address: string;
    readonly status: boolean;
}

export const PayementSchema = new mongoose.Schema({
    firstname: { type: String, default: "" },
    lastname: { type: String, default: "" },
    address: { type: String, default: "" },
    imgUrl: { type: String, default: "" },
    toolId: mongoose.Types.ObjectId,
    status: { type: Boolean, default: true },
}, { timestamps: true });