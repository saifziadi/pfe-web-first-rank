import { Controller, Get, Post, Body, Res, HttpStatus, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { ToolService } from './tool.service';

@Controller('tool')
export class ToolSControlleur {

    constructor(private ToolService: ToolService) { }


        // Retrieve documents list
        @Get('getAll')
        async getAlldocument(@Res() res) {
            const documents = await this.ToolService.getAll();
            return res.status(HttpStatus.OK).json(documents);
        }
    
        // Fetch a particular document using ID
        @Get(':id')
        async getdocument(@Res() res, @Param('id') id) {
            const document = await this.ToolService.getById(id);
            if (!document) throw new NotFoundException('document does not exist!');
            return res.status(HttpStatus.OK).json(document);
        }
    
        // Fetch a particular document using ID
        @Get('check/:id')
        async documentExists(@Res() res, @Param('id') id) {
            const result = await this.ToolService.checkExistanceById(id);
            if (result == false) throw new NotFoundException('document does not exist!');
            return res.status(HttpStatus.OK).json(true);
        }
    
        // add a document
        @Post('create')
        async adddocument(@Res() res, @Body() createDto: any) {
            const document = await this.ToolService.addNewDocument(createDto);
            return res.status(HttpStatus.OK).json({
                message: "document has been created successfully",
                document
            })
        }
    
        // Update a document's details
        @Put('update/:id')
        async updatedocument(@Res() res, @Param('id') id, @Body() createdocumentDTO: any) {
            const document = await this.ToolService.updateDocumet(id, createdocumentDTO);
            if (!document) throw new NotFoundException('document does not exist!');
            return res.status(HttpStatus.OK).json({
                message: 'document has been successfully updated',
                document
            });
        }
    
        // Delete a document
        @Delete('delete/:id')
        async deletedocument(@Res() res, @Param('id') id) {
            const document = await this.ToolService.deleteDocument(id);
            if (!document) throw new NotFoundException('document does not exist');
            return res.status(HttpStatus.OK).json({
                message: 'document has been deleted',
                document
            })
        }
}
