import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogAddComponent } from './blog-add/blog-add.component';
import { BlogEditComponent } from './blog-edit/blog-edit.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { MaterialModule } from 'app/core/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [BlogAddComponent, BlogEditComponent, BlogListComponent],
  imports: [
    CommonModule,
    BlogRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BlogModule { }
