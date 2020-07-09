import { ConfigModule } from './../../core/config/config.module';
import { Module } from '@nestjs/common';
import { PayementService } from './payment.service';
import { PayementController } from './payment.controlleur';
import { MongooseModule } from '@nestjs/mongoose';
import { PayementSchema } from 'src/models/payment.model';

@Module({
  imports : [
    MongooseModule.forFeature([{ name: 'Payement', schema: PayementSchema }]),
    ConfigModule
  ],
  providers: [PayementService],
  controllers:[PayementController]
})
export class PaymentModule {}
