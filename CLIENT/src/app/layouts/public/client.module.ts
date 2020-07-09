import { MaterialModule } from './../../core/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeModule } from './home/home.module';

@NgModule({
  declarations: [LoginComponent,RegisterComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ClientRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HomeModule,
  ],
})
export class ClientModule { }
