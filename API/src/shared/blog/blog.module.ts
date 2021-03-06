import { ConfigModule } from './../../core/config/config.module';
import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogSchema } from 'src/models/blog.model';
import { BlogController } from './blog.controleur';

@Module({
  imports : [
    MongooseModule.forFeature([{ name: 'Blog', schema: BlogSchema }]),
    ConfigModule
  ],
  providers: [BlogService],
  controllers: [BlogController]
})
export class BlogModule {}
