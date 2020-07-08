import { Component, OnInit } from '@angular/core';
import { ToolService } from 'app/services/Tool.service';
import { NotificationsService } from 'app/services/notifications.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tool-edit',
  templateUrl: './tool-edit.component.html',
  styleUrls: ['./tool-edit.component.css']
})
export class ToolEditComponent  {

  constructor(private toolService : ToolService,
    private notificationsService :NotificationsService,
    private router : Router) {
    if (!this.toolService.formModel.value._id) {
      this.router.navigateByUrl('tools/list')
    }else{
      // console.log("formModel : ",this.toolService.formModel.value) 
    }
   }

  onSubmit(){
    console.log("this.formModel.value : ",this.toolService.formModel.value)
    this.toolService.editById(this.toolService.formModel.value._id,this.toolService.formModel.value)
    .subscribe(response=>{
      console.log("Edited successfully : ",response)
      this.notificationsService.showNotification('success','Successful Edition - tool Successfully Edited.')
    },err=>{
      this.notificationsService.showNotification('danger','Something Wrong - Please Enter Valid Information.')

    })
  }

  UploadImage(files) {
    var file: File = files[0];
    console.log(file)
    if (file) {
      const formData: any = new FormData();
      formData.append('file', file);
      this.toolService.UpdateImage(formData)
        .subscribe(res => {
          console.log(res);
          console.log("image result : ", res)
          this.toolService.formModel.patchValue({imageUrl : res})
        },
          err => {
            console.error(err);
          })
    }

  }

}
