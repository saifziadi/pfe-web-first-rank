import { MessageService } from './../../../../services/message.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotificationsService } from 'app/services/notifications.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {

  @ViewChild('regForm') myForm: NgForm;

  constructor(
    public messageService : MessageService,
    private notificationsService: NotificationsService,
    ) { }

  onSubmit(){
    this.messageService.createNew()
    .subscribe(res=>{
      console.log("res : ",res)
      this.notificationsService.showNotification('success', 'Message Successfully Posted.')
      this.resetForm()
    })
  }

  resetForm(){
    this.messageService.formModel.reset(), 
    this.myForm.resetForm();
  }

}
