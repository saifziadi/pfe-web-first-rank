import { MessageService } from './../../../../services/message.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  constructor(private messageService : MessageService) { }

  ngOnInit(): void {
  }


  onSubmit(){
    this.messageService.createNew()
    .subscribe(res=>{
      console.log("res : ",res)
    })
  }

}
