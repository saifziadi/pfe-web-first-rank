import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Tool} from 'src/models/tool.model';

@Injectable()
export class ToolService {

    constructor(@InjectModel('Tool') private readonly Model: Model<Tool>) { }

    // fetch all documents
    async getAll(): Promise<Tool[]> {
        const result = await this.Model.find();
        return result;
    }
    
    // Get a single Document
    async getById(id): Promise<Tool> {
        const result = await this.Model.findById(id);
        return result;
    }

    // Check if document exists
    async checkExistanceById(id): Promise<boolean> {
        const result = await this.Model.findById(id);
        return result==null?false:true;
    }

    // post a single document
    async addNewDocument(body: any): Promise<Tool> {
        const newResult = await this.Model(body);
        return newResult.save();
    }
    // Edit document details
    async updateDocumet(id, body: any): Promise<Tool> {
        const result = await this.Model
            .findByIdAndUpdate(id, body, { new: true });
        return result;
    }
    // Delete a document
    async deleteDocument(id): Promise<any> {
        const deletedResult = await this.Model.findByIdAndRemove(id);
        return deletedResult;
    }
}
