import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MessageComponent } from './message/message.component';
import { ReviewPostComponent } from './review-post/review-post.component';
import { PaymentComponent } from './payment/payment.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { NavBarComponent } from './extra/nav-bar/nav-bar.component';
import { CarrouselComponent } from './extra/carrousel/carrousel.component';
import { BlogCardsComponent } from './blog-cards/blog-cards.component';


@NgModule({
  declarations: [HomeComponent, MessageComponent, ReviewPostComponent, PaymentComponent, BlogDetailsComponent, NavBarComponent, BlogListComponent,CarrouselComponent, BlogCardsComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
})
export class HomeModule { }
