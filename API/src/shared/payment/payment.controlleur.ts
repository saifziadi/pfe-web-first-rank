import { diskStorage } from 'multer';
import { Controller, HttpStatus, Res, Get, Param, NotFoundException, Post, Body, Put, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PayementService } from './payment.service';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { ConfigService } from 'src/core/config/config.service';

@Controller('payment')
export class PayementController {
    
    constructor(private PayementService: PayementService,private configService :ConfigService) { }


    @Post('avatar/')
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('file',
        {
            storage: diskStorage({
                destination: './avatars/payments',
                filename: (req, file, cb) => {
                    const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                    return cb(null, `${randomName}${extname(file.originalname)}`)
                }
            })
        }
    ))
    async uploadAvatar(@Res() res, @UploadedFile() file) {
        let originalpath = this.configService.get('APP_URI') + file.path
        return res.status(HttpStatus.OK).json(originalpath);
    }

        // Retrieve documents list
        @Get('getAll')
        async getAlldocument(@Res() res) {
            const documents = await this.PayementService.getAll();
            return res.status(HttpStatus.OK).json(documents);
        }
    
        // Fetch a particular document using ID
        @Get(':id')
        async getdocument(@Res() res, @Param('id') id) {
            const document = await this.PayementService.getById(id);
            if (!document) throw new NotFoundException('document does not exist!');
            return res.status(HttpStatus.OK).json(document);
        }
    
        // Fetch a particular document using ID
        @Get('check/:id')
        async documentExists(@Res() res, @Param('id') id) {
            const result = await this.PayementService.checkExistanceById(id);
            if (result == false) throw new NotFoundException('document does not exist!');
            return res.status(HttpStatus.OK).json(true);
        }
    
        // add a document
        @Post('create')
        async adddocument(@Res() res, @Body() createDto: any) {
            const document = await this.PayementService.addNewDocument(createDto);
            return res.status(HttpStatus.OK).json({
                PayementService: "document has been created successfully",
                document
            })
        }
    
        // Update a document's details
        @Put('update/:id')
        async updatedocument(@Res() res, @Param('id') id, @Body() createdocumentDTO: any) {
            const document = await this.PayementService.updateDocumet(id, createdocumentDTO);
            if (!document) throw new NotFoundException('document does not exist!');
            return res.status(HttpStatus.OK).json({
                PayementService: 'document has been successfully updated',
                document
            });
        }
    
        // Delete a document
        @Delete('delete/:id')
        async deletedocument(@Res() res, @Param('id') id) {
            const document = await this.PayementService.deleteDocument(id);
            if (!document) throw new NotFoundException('document does not exist');
            return res.status(HttpStatus.OK).json({
                PayementService: 'document has been deleted',
                document
            })
        }
}
