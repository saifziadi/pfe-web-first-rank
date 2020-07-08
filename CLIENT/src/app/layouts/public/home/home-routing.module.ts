import { ReviewPostComponent } from './review-post/review-post.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentComponent } from './payment/payment.component';
import { MessageComponent } from './message/message.component';
import { BlogListComponent } from './blog-list/blog-list.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'blog/details', component: BlogDetailsComponent },
  { path: 'blog/list', component: BlogListComponent },
  { path: 'review', component: ReviewPostComponent },
  { path: 'message', component: MessageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
