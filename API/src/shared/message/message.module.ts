import { Module } from '@nestjs/common';
import { MessageService } from './Message.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from 'src/models/Message.model';
import { MessageController } from './message.controlleur';

@Module({
  imports : [
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),
  ],
  providers: [MessageService],
  controllers: [MessageController]
})
export class MessageModule {}