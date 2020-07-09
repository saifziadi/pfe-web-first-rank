import { Component, OnInit, ViewChild } from '@angular/core';
import { ReviewService } from 'app/services/review.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['position', 'comment','price','support','efficiency', 'createdAt', 'action'];

  constructor(
    private reviewService: ReviewService,
  ) { 
    this.getAllReviews()

  }

  ngOnInit(): void {
  }

  getAllReviews(){
    this.reviewService.getAll()
    .subscribe((res:any)=>{
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
    })
  }

  deleteById(id,index){
    this.reviewService.deleteById(id)
    .subscribe(
      (res: any) => {
        console.log(res);
        this.dataSource.data.splice(index, 1);
        this.dataSource = new MatTableDataSource(this.dataSource.data);
        this.dataSource.paginator = this.paginator;
      },
      err => {
        console.log(err);
      },
    );
  }

}
