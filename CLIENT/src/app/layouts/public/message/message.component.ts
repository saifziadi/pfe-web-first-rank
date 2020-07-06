import { Component, OnInit } from '@angular/core';
import { MessageService } from 'app/services/message.service';
import { NotificationsService } from 'app/services/notifications.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {

  constructor(private messageService : MessageService,
    private notificationsService :NotificationsService,
    private router : Router) {
    if (!this.messageService.formModel.value._id) {
      this.router.navigateByUrl('messages/list')
    }else{
      // console.log("formModel : ",this.messageService.formModel.value) 
    }
   }

  onSubmit(){
    console.log("this.formModel.value : ",this.messageService.formModel.value)
    this.messageService.editById(this.messageService.formModel.value._id,this.messageService.formModel.value)
    .subscribe(response=>{
      console.log("Edited successfully : ",response)
      this.notificationsService.showNotification('success','Successful Edition - message Successfully Edited.')
    },err=>{
      this.notificationsService.showNotification('danger','Something Wrong - Please Enter Valid Information.')

    })
  }
}
