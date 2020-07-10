import { BlogService } from 'app/services/blog.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent {
  blogs : any = []

  constructor(private blogService : BlogService,private router : Router) {
    this.getAllBlogs()
   }

   getAllBlogs(){
    this.blogService.getAll()
    .subscribe(res=>{
      this.blogs = res
    })
   }

  goToDetails(blog){
    this.blogService.fillFormModel(blog)
    this.router.navigateByUrl('/blog/details')
  }

}
