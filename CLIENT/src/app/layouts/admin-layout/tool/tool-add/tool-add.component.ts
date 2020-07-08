import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'app/services/notifications.service';
import { ToolService } from 'app/services/Tool.service';

@Component({
  selector: 'app-tool-add',
  templateUrl: './tool-add.component.html',
  styleUrls: ['./tool-add.component.css']
})
export class ToolAddComponent {

  constructor(
    private toolService: ToolService,
    private notificationsService: NotificationsService,
  ) {
    this.toolService.createFormModel()
  }

  onSubmit() {
    delete this.toolService.formModel.value._id
    console.log("this.formModel.value : ", this.toolService.formModel.value)
    this.toolService.createNew(this.toolService.formModel.value)
      .subscribe(response => {
        console.log("Added successfully : ", response)
        this.notificationsService.showNotification('success', 'Successful Addition - tool Successfully Added.')
      }, err => {
        this.notificationsService.showNotification('danger', 'Something Wrong - Please Enter Valid Information.')

      })
  }


  UploadImage(files) {
    var file: File = files[0];
    console.log(file)
    if (file) {
      const formData: any = new FormData();
      formData.append('file', file);
      this.toolService.UploadImage(formData)
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
