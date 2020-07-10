import { BlogService } from 'app/services/blog.service';
import { Component, OnInit } from '@angular/core';
import { AccountService } from 'app/services/account.service';
import { NotificationsService } from 'app/services/notifications.service';
import { ReviewService } from 'app/services/review.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {

  isConnected : boolean = false;
  blogDetails: any = {};

  constructor(private blogService: BlogService,
    private accountService: AccountService,
    private notificationsService: NotificationsService,
    private reviewService: ReviewService,
    private router: Router) { 
      if (!this.blogService.formModel.value._id) {
        this.router.navigateByUrl('/blog/list')
      } else {
        let token =this.accountService.getDecodedToken();
        if (token) {
          this.isConnected= true 
        }
        console.clear()
        console.log("formModel : ", this.blogService.formModel.value)
        this.blogDetails = this.blogService.formModel.value
      }
      console.log(this.blogService.formModel.value);
    }

  ngOnInit(): void {
  }

}
