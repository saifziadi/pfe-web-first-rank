import { ConfigModule } from './../../core/config/config.module';
import { Module } from '@nestjs/common';
import { ToolService } from './tool.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ToolSchema } from 'src/models/tool.model';
import { ToolSControlleur } from './tool.controlleur';

@Module({
  imports : [
    MongooseModule.forFeature([{ name: 'Tool', schema: ToolSchema }]),
    ConfigModule
  ],
  providers: [ToolService],
  controllers:[ToolSControlleur]
})
export class ToolModule {}
