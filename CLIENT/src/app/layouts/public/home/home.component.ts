import { ToolService } from 'app/services/Tool.service';
import { Component, OnInit } from '@angular/core';
import { AccountService } from 'app/services/account.service';
import { Router } from '@angular/router';
import { BlogService } from 'app/services/blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tools: any = []
  groupedTools : any = []

  connected: boolean = false
  constructor(
    private accountService: AccountService,
    private router: Router,
    private toolService: ToolService,
  ) {
    let token = this.accountService.getDecodedToken();
    this.connected = token ? true : false
    this.GroupedByCategory()
  }

  GroupedByCategory() {
    this.toolService.GroupedByCategory()
      .subscribe((res: any) => {
        console.log("res tools : ", res)

        this.tools = res
        if (this.tools && this.tools.length>0) {
          this.tools[0].active = true
          this.groupedTools = this.tools[0].tools
          if (this.groupedTools.length > 3) {
            this.groupedTools.length = 3
          }
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
  ngOnInit(): void {
  }

}
