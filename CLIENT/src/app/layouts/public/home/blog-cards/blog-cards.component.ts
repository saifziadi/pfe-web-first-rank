import { Component, OnInit } from '@angular/core';
import { BlogService } from 'app/services/blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-cards',
  templateUrl: './blog-cards.component.html',
  styleUrls: ['./blog-cards.component.css']
})
export class BlogCardsComponent {

  blogs: any = []

  constructor(    
    private blogService : BlogService,
    private router: Router,
    ) { 
    this.getAllBlogs()

  }

  getAllBlogs(){
    this.blogService.getAll()
    .subscribe((res:any)=>{
      if(res && res.length>3){
        res.length = 3
      }
      this.blogs = res
    })
   }
}
