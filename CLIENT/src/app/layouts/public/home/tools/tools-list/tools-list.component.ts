import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountService } from 'app/services/account.service';
import { ToolService } from 'app/services/Tool.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tools-list',
  templateUrl: './tools-list.component.html',
  styleUrls: ['./tools-list.component.css']
})
export class ToolsListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;


  
  tools: any = []
  groupedTools : any = []

  constructor(private router : Router,private toolService: ToolService) {
      this.GroupedByCategory()

      this.toolService.getAll()
      .subscribe(res=>this.toolService.fillTools(res))
     }

  ngOnInit(): void {
  }

  GroupedByCategory() {
    this.toolService.GroupedByCategory()
      .subscribe((res: any) => {
        console.log("res tools : ", res)

        this.tools = res
        if (this.tools && this.tools.length>0) {
          this.tools[0].active = true
          this.toolService.dataSource = new MatTableDataSource<any>(this.tools[0].tools);
          this.toolService.cardsObs = this.toolService.dataSource.connect();
          this.toolService.dataSource.paginator = this.paginator;

          
          console.log("this.groupedTools : ",this.groupedTools)

        }
      })
  }

  openPayment(tool){
    this.toolService.fillFormModel(tool)
    this.toolService.openDialog()
  }

  goToDetails(tool){
      this.toolService.fillFormModel(tool)
      this.router.navigateByUrl('/tool/details')
  }

  activateCategory(id){
    this.tools.map(x=>{
      if (x._id != id && x.active) {
        x.active = false
      }else if (x._id ==id){
        x.active = true
        this.groupedTools = this.tools.find(x=>x._id == id).tools
        console.log("this.groupedTools : ",this.groupedTools)
      }
    })
  }
}
