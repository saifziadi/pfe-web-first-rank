import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {HttpClientModule} from '@angular/common/http';
import { MaterialModule } from 'app/core/material/material.module';
import { ReviewListComponent } from './review-list/review-list.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { ImageDialogComponent } from './payment-list/image-dialog/image-dialog.component';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    ReviewListComponent,
    ContactListComponent,
    PaymentListComponent,
    ImageDialogComponent

  ]
})
export class AdminLayoutModule {}
