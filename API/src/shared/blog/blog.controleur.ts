import { diskStorage } from 'multer';
import { Controller, HttpStatus, Res, Get, Param, NotFoundException, Post, Body, Put, Delete, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { BlogService } from './blog.service';
import { ConfigService } from 'src/core/config/config.service';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

@Controller('blog')
export class BlogController {

    constructor(private blogService: BlogService, private configService: ConfigService) { }

    @Post('avatar/')
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('file',
        {
            storage: diskStorage({
                destination: './avatars/blogs',
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
                destination: './avatars/blogs',
                filename: (req, file, cb) => {
                    const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                    return cb(null, `${randomName}${extname(file.originalname)}`)
                }
            })
        }
    ))
    async updateAvatar(@Res() res, @UploadedFile() file, @Param('id') id) {
        let doc = await this.blogService.getById(id);
        let originalpath = this.configService.get('APP_URI') + file.path
        doc.imageUrl = originalpath
        this.blogService.updateDocumet(id, doc)
        return res.status(HttpStatus.OK).json(originalpath);
    }

    // Retrieve documents list
    @Get('getAll')
    async getAlldocument(@Res() res) {
        const documents = await this.blogService.getAll();
        return res.status(HttpStatus.OK).json(documents);
    }

    // Fetch a particular document using ID
    @Get(':id')
    async getdocument(@Res() res, @Param('id') id) {
        const document = await this.blogService.getById(id);
        if (!document) throw new NotFoundException('document does not exist!');
        return res.status(HttpStatus.OK).json(document);
    }

    // Fetch a particular document using ID
    @Get('check/:id')
    async documentExists(@Res() res, @Param('id') id) {
        const result = await this.blogService.checkExistanceById(id);
        if (result == false) throw new NotFoundException('document does not exist!');
        return res.status(HttpStatus.OK).json(true);
    }

    // add a document
    @Post('create')
    async adddocument(@Res() res, @Body() createDto: any) {
        const document = await this.blogService.addNewDocument(createDto);
        return res.status(HttpStatus.OK).json({
            message: "document has been created successfully",
            document
        })
    }

    // Update a document's details
    @Put('update/:id')
    async updatedocument(@Res() res, @Param('id') id, @Body() createdocumentDTO: any) {
        const document = await this.blogService.updateDocumet(id, createdocumentDTO);
        if (!document) throw new NotFoundException('document does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'document has been successfully updated',
            document
        });
    }

    // Delete a document
    @Delete('delete/:id')
    async deletedocument(@Res() res, @Param('id') id) {
        const document = await this.blogService.deleteDocument(id);
        if (!document) throw new NotFoundException('document does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'document has been deleted',
            document
        })
    }
}
