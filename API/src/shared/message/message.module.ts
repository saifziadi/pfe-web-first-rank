import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from 'src/models/Message.model';
import { MessageService } from './message.service';
import { MessageController } from './message.controlleur';

@Module({
  imports : [
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),
  ],
  providers: [MessageService],
  controllers:[MessageController]

})
export class MessageModule {}
