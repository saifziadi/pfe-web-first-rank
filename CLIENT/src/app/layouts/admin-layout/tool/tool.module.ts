import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolRoutingModule } from './tool-routing.module';
import { ToolAddComponent } from './tool-add/tool-add.component';
import { ToolEditComponent } from './tool-edit/tool-edit.component';
import { ToolListComponent } from './tool-list/tool-list.component';


@NgModule({
  declarations: [ToolAddComponent, ToolEditComponent, ToolListComponent],
  imports: [
    CommonModule,
    ToolRoutingModule
  ]
})
export class ToolModule { }
