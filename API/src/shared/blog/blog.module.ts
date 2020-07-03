import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogSchema } from 'src/models/blog.model';
import { BlogController } from './blog.controleur';

@Module({
  imports : [
    MongooseModule.forFeature([{ name: 'Blog', schema: BlogSchema }]),
  ],
  providers: [BlogService],
  controllers: [BlogController]
})
export class BlogModule {}
