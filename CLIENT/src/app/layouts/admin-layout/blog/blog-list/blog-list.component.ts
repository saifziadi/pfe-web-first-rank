import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AccountService } from 'app/services/account.service';
import { Router } from '@angular/router';
import { BlogService } from 'app/services/blog.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['position', 'title','status', 'createdAt', 'action'];

  constructor(private eventSerivce : BlogService,
    private accountService : AccountService,
    private router : Router) { 
    let token =this.accountService.getDecodedToken();
    let currentRoles = token.roles;
    let currentUserId = token.sub;
    let isAdmin = currentRoles.some(role => currentRoles.includes("admin"));
    if(isAdmin) this.getAllForAdmin()
    else this.getAllForAdmin()

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllForAdmin() {
    this.eventSerivce.getAll()
    .subscribe((response : any)=>{
     console.log("events : ",response)
     this.dataSource = new MatTableDataSource(response);
    this.dataSource.paginator = this.paginator;
    })
  }

  editById(body){
    this.eventSerivce.fillFormModel(body)
    this.router.navigateByUrl('/blogs/edit')
  }

  deleteById(id,index){
    this.eventSerivce.deleteById(id)
    .subscribe(
      (res: any) => {
        console.log(res);
        this.dataSource.data.splice(index, 1);
        this.dataSource = new MatTableDataSource(this.dataSource.data);
        this.dataSource.paginator = this.paginator;
        // this.toastr.info('House Suppression !', 'House deleted successfully.');
      },
      err => {
        console.log(err);
      },
    );
  }


}
