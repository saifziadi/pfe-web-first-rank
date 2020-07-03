import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './shared/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from './core/config/config.module';
import { ConfigService } from './core/config/config.service';
import { EventModule } from './shared/event/event.module';
import { BlogModule } from './shared/blog/blog.module';
import { MessageService } from './shared/message/message.service';


import { ReviewModule } from './shared/review/review.module';
import { ToolModule } from './shared/tool/tool.module';
import { PaymentModule } from './shared/payment/payment.module';
import { MessageModule } from './shared/message/message.module';


@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        // uri: `mongodb://${configService.get('DB_URI')}/${configService.get('DB_NAME')}`,
        uri: `mongodb+srv://${configService.get('DB_USER')}:${configService.get('DB_PWD')}@${configService.get('DB_URI')}/${configService.get('DB_NAME')}?${configService.get('DB_PARAMS')}`,
        useNewUrlParser: true
      }),
      inject: [ConfigService]
    }),



    AuthModule,
    UsersModule,
    ConfigModule,
    EventModule,
    BlogModule,
    MessageModule,
    PaymentModule,
    ReviewModule,
    ToolModule
  ],
  controllers: [AppController],
  providers: [
  ],
})
export class AppModule {}
