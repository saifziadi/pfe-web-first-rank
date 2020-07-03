import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogAddComponent } from './blog-add/blog-add.component';
import { BlogEditComponent } from './blog-edit/blog-edit.component';
import { BlogListComponent } from './blog-list/blog-list.component';


const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: BlogListComponent },
  { path: 'add', component: BlogAddComponent },
  { path: 'edit', component: BlogEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
