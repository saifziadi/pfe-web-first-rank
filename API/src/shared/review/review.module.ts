import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewSchema } from 'src/models/review.model';
import {ReviewControlleur} from 'src/shared/review/review.controller'

@Module({
  imports : [
    MongooseModule.forFeature([{ name: 'Event', schema: ReviewSchema }]),
  ],
  providers: [ReviewService],
  controllers: [ReviewControlleur]
})
export class ReviewModule {}
