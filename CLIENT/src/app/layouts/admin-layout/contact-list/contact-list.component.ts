import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'app/services/message.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource :any = new MatTableDataSource();
  displayedColumns: string[] = ['email','subject','content','createdAt', 'action'];


  constructor(private messageService : MessageService) {
    this.getAllMessages()
   }

   getAllMessages(){
    this.messageService.getAll()
    .subscribe((response:any)=>{
      console.log("contacts : ",response);
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
    })
   }

   deleteById(id,index){
    this.messageService.deleteById(id)
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
