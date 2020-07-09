import { ImageDialogComponent } from './image-dialog/image-dialog.component';
import { PaymentService } from './../../../services/payment.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";


@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['position', 'firstname','lastname','address','imageUrl', 'createdAt'];

  constructor(
    private paymentservice: PaymentService,private dialog: MatDialog
  ) { 
    this.getAllPayments()
  }

  openDialog(imageUrl) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.height ="450px"
    dialogConfig.width ="600px"
    dialogConfig.data = imageUrl

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(ImageDialogComponent, dialogConfig);
}

  getAllPayments(){
    this.paymentservice.getAll()
    .subscribe((res:any)=>{
      console.log("res : ",res);
      
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
    })
  }

}
