import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import{MessageSchema} from 'src/models/message.model'
import { MongooseModule } from '@nestjs/mongoose';
import {messageController}from 'src/shared/message/message.controlleur'
@Module({
  imports : [
    MongooseModule.forFeature([{ name: 'message', schema: MessageSchema }]),
  ],
  providers: [MessageService],
  controllers:[messageController]

})
export class MessageModule {}
