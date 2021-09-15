import { PaymentService } from './../../../../services/payment.service';
import { Component, OnInit } from '@angular/core';
import { ToolService } from 'app/services/Tool.service';
import { Router } from '@angular/router';
import { AccountService } from 'app/services/account.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationsService } from 'app/services/notifications.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  toolDetails: any = {};
  isConnected: boolean = false;

  constructor(
    public paymentService: PaymentService,
    public dialogRef: MatDialogRef<PaymentComponent>,
    public toolService: ToolService,
    public accountService: AccountService,
    private notificationsService: NotificationsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.toolService.formModel.value._id) {
      this.router.navigateByUrl('/tool/list')
    } else {
      let token = this.accountService.getDecodedToken();
      if (token) {
        this.isConnected = true
      }
      console.log("formModel : ", this.toolService.formModel.value)
      this.toolDetails = this.toolService.formModel.value
      this.paymentService.formModel.patchValue({toolId : this.toolDetails._id})
    }
    console.clear()
    console.log(this.toolService.formModel.value);
  }

  close() {
    this.dialogRef.close();
  }

  onSubmit(){
    this.paymentService.createNew()
    .subscribe(res=>{
      console.log("res : ",res)
      this.close()
      this.notificationsService.showNotification('success', 'Payment Transaction - Payment Successfully Sent.')
      this.notificationsService.showNotification('info', 'We will Contact You As Soon As Possible.')
    })
  }

  UploadImage(files) {
    var file: File = files[0];
    console.log(file)
    if (file) {
      const formData: any = new FormData();
      formData.append('file', file);
      this.paymentService.UploadImage(formData)
        .subscribe(res => {
          console.log(res);
          console.log("image result : ", res)
          this.paymentService.formModel.patchValue({ imageUrl: res })
        },
        err => {
          console.error(err);
        })
    }

  }

}
