import * as mongoose from 'mongoose';

export interface Tool extends mongoose.Document {
    readonly _id: string;
    readonly title: string;
    readonly description: string;
    readonly price: string;
    readonly rate: string;
    readonly url: string;
    readonly categorie: string;
    readonly imageUrl: string;

    readonly status: boolean;
    readonly roles   : string[]; 
}

export const ToolSchema = new mongoose.Schema({
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    price: { type: String, default: "" },
    rate: { type: String, default: "" },
    url: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    categorie: { type: String, default: "" },
    roles   : [String],
    status: { type: Boolean, default: true },
}, { timestamps: true });