import { Controller, HttpStatus, Res, Get, Param, NotFoundException, Post, Body, Put, Delete } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('message')
export class messageController {
    
    constructor(private MessageService: MessageService) { }


        // Retrieve documents list
        @Get('getAll')
        async getAlldocument(@Res() res) {
            const documents = await this.MessageService.getAll();
            return res.status(HttpStatus.OK).json(documents);
        }
    
        // Fetch a particular document using ID
        @Get(':id')
        async getdocument(@Res() res, @Param('id') id) {
            const document = await this.MessageService.getById(id);
            if (!document) throw new NotFoundException('document does not exist!');
            return res.status(HttpStatus.OK).json(document);
        }
    
        // Fetch a particular document using ID
        @Get('check/:id')
        async documentExists(@Res() res, @Param('id') id) {
            const result = await this.MessageService.checkExistanceById(id);
            if (result == false) throw new NotFoundException('document does not exist!');
            return res.status(HttpStatus.OK).json(true);
        }
    
        // add a document
        @Post('create')
        async adddocument(@Res() res, @Body() createDto: any) {
            const document = await this.MessageService.addNewDocument(createDto);
            return res.status(HttpStatus.OK).json({
                MessageService: "document has been created successfully",
                document
            })
        }
    
        // Update a document's details
        @Put('update/:id')
        async updatedocument(@Res() res, @Param('id') id, @Body() createdocumentDTO: any) {
            const document = await this.MessageService.updateDocumet(id, createdocumentDTO);
            if (!document) throw new NotFoundException('document does not exist!');
            return res.status(HttpStatus.OK).json({
                MessageService: 'document has been successfully updated',
                document
            });
        }
    
        // Delete a document
        @Delete('delete/:id')
        async deletedocument(@Res() res, @Param('id') id) {
            const document = await this.MessageService.deleteDocument(id);
            if (!document) throw new NotFoundException('document does not exist');
            return res.status(HttpStatus.OK).json({
                MessageService: 'document has been deleted',
                document
            })
        }
}
