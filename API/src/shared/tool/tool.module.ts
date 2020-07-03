import { Module } from '@nestjs/common';
import { ToolService } from './tool.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ToolSchema } from 'src/models/tool.model';
import { ToolSControlleur } from './tool.controlleur';

@Module({
  imports : [
    MongooseModule.forFeature([{ name: 'Tool', schema: ToolSchema }]),
  ],
  providers: [ToolService],
  controllers:[ToolSControlleur]
})
export class ToolModule {}
