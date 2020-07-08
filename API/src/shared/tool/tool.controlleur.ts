import { diskStorage } from 'multer';
import { Controller, Get, Post, Body, Res, HttpStatus, Param, Put, Delete, NotFoundException, UseGuards, UseInterceptors, UploadedFile, Req } from '@nestjs/common';
import { ToolService } from './tool.service';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { ConfigService } from 'src/core/config/config.service';

@Controller('tool')
export class ToolSControlleur {

    constructor(private ToolService: ToolService,private configService: ConfigService) { }


    @Post('avatar/')
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('file',
        {
            storage: diskStorage({
                destination: './avatars/tools',
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



    @Put('avatar/update/:id')
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('file',
        {
            storage: diskStorage({
                destination: './avatars/tools',
                filename: (req, file, cb) => {
                    const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                    return cb(null, `${randomName}${extname(file.originalname)}`)
                }
            })
        }
    ))
    async updateAvatar(@Res() res, @UploadedFile() file,@Param('id') id) {
        let doc = await this.ToolService.getById(id);
        let originalpath = this.configService.get('APP_URI') + file.path
        doc.imageUrl = originalpath
        this.ToolService.updateDocumet(id,doc)
        return res.status(HttpStatus.OK).json(originalpath);
    }
















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
