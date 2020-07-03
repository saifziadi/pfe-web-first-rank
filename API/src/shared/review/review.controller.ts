import { Controller, Get, Post, Body, Res, HttpStatus, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewControlleur {

    constructor(private ReviewService: ReviewService) { }


        // Retrieve documents list
        @Get('getAll')
        async getAlldocument(@Res() res) {
            const documents = await this.ReviewService.getAll();
            return res.status(HttpStatus.OK).json(documents);
        }
    
        // Fetch a particular document using ID
        @Get(':id')
        async getdocument(@Res() res, @Param('id') id) {
            const document = await this.ReviewService.getById(id);
            if (!document) throw new NotFoundException('document does not exist!');
            return res.status(HttpStatus.OK).json(document);
        }
    
        // Fetch a particular document using ID
        @Get('check/:id')
        async documentExists(@Res() res, @Param('id') id) {
            const result = await this.ReviewService.checkExistanceById(id);
            if (result == false) throw new NotFoundException('document does not exist!');
            return res.status(HttpStatus.OK).json(true);
        }
    
        // add a document
        @Post('create')
        async adddocument(@Res() res, @Body() createDto: any) {
            const document = await this.ReviewService.addNewDocument(createDto);
            return res.status(HttpStatus.OK).json({
                message: "document has been created successfully",
                document
            })
        }
    
        // Update a document's details
        @Put('update/:id')
        async updatedocument(@Res() res, @Param('id') id, @Body() createdocumentDTO: any) {
            const document = await this.ReviewService.updateDocumet(id, createdocumentDTO);
            if (!document) throw new NotFoundException('document does not exist!');
            return res.status(HttpStatus.OK).json({
                message: 'document has been successfully updated',
                document
            });
        }
    
        // Delete a document
        @Delete('delete/:id')
        async deletedocument(@Res() res, @Param('id') id) {
            const document = await this.ReviewService.deleteDocument(id);
            if (!document) throw new NotFoundException('document does not exist');
            return res.status(HttpStatus.OK).json({
                message: 'document has been deleted',
                document
            })
        }
}
