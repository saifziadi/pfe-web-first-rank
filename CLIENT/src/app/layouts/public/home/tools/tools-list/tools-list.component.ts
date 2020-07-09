import { Component, OnInit } from '@angular/core';
import { AccountService } from 'app/services/account.service';
import { ToolService } from 'app/services/Tool.service';

@Component({
  selector: 'app-tools-list',
  templateUrl: './tools-list.component.html',
  styleUrls: ['./tools-list.component.css']
})
export class ToolsListComponent implements OnInit {

  tools: any = []
  groupedTools : any = []

  constructor(private accountService: AccountService,
    private toolService: ToolService,) {
      this.GroupedByCategory()
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
          this.groupedTools = this.tools[0].tools
          console.log("this.groupedTools : ",this.groupedTools)

        }
      })
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
