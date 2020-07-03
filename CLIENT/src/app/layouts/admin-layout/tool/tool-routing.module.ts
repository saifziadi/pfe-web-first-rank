import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToolAddComponent } from './tool-add/tool-add.component';
import { ToolEditComponent } from './tool-edit/tool-edit.component';
import { ToolListComponent } from './tool-list/tool-list.component';


const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: ToolListComponent },
  { path: 'add', component: ToolAddComponent },
  { path: 'edit', component: ToolEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToolRoutingModule { }
