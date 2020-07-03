import { Module } from '@nestjs/common';
import { PayementService } from './payment.service';
import { PayementController } from './payment.controlleur';
import { MongooseModule } from '@nestjs/mongoose';
import { PayementSchema } from 'src/models/payment.model';

@Module({
  imports : [
    MongooseModule.forFeature([{ name: 'payment', schema: PayementSchema }]),
  ],
  providers: [PayementService],
  controllers:[PayementController]
})
export class PaymentModule {}
