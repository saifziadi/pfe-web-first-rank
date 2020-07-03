import * as mongoose from 'mongoose';

export interface Tool extends mongoose.Document {
    readonly _id: string;
    readonly title: string;
    readonly description: string;
    readonly price: string;
    readonly rate: string;
    readonly url: string;
    readonly categorie: string;
    readonly startDate: Date;
    readonly endDate: Date;
    readonly status: boolean;
    readonly roles   : string[]; 
}

export const ToolSchema = new mongoose.Schema({
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    price: { type: String, default: "" },
    rate: { type: String, default: "" },
    url: { type: String, default: "" },
    categorie: { type: String, default: "" },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, default: Date.now },
    roles   : [String],
    status: { type: Boolean, default: true },
}, { timestamps: true });