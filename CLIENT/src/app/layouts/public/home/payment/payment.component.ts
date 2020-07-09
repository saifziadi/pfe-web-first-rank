import { Component, OnInit } from '@angular/core';
import { ToolService } from 'app/services/Tool.service';
import { Router } from '@angular/router';
import { AccountService } from 'app/services/account.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  toolDetails: any = {};
  isConnected: boolean = false;

  constructor(
    private toolService: ToolService,
    private accountService: AccountService,
    private router: Router
    ) { }

  ngOnInit(): void {
    if (!this.toolService.formModel.value._id) {
      this.router.navigateByUrl('/tool/list')
    } else {
      let token =this.accountService.getDecodedToken();
      if (token) {
        this.isConnected= true 
      }
      console.log("formModel : ", this.toolService.formModel.value)
      this.toolDetails = this.toolService.formModel.value
    }
    console.clear()
    console.log(this.toolService.formModel.value);
  }

}
