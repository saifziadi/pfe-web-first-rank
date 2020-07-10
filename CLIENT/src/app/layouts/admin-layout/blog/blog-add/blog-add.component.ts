import { Component, OnInit } from '@angular/core';
import { BlogService } from 'app/services/blog.service';
import { NotificationsService } from 'app/services/notifications.service';

@Component({
  selector: 'app-blog-add',
  templateUrl: './blog-add.component.html',
  styleUrls: ['./blog-add.component.css']
})
export class BlogAddComponent {

  
  constructor(
    private blogService : BlogService,
    private notificationsService :NotificationsService,
  ) { 
    this.blogService.createFormModel()
  }

  onSubmit(){
    delete this.blogService.formModel.value._id
    console.log("this.formModel.value : ",this.blogService.formModel.value)
    this.blogService.createNew(this.blogService.formModel.value)
    .subscribe(response=>{
      console.log("Added successfully : ",response)
      this.notificationsService.showNotification('success','Successful Addition - Blog Successfully Added.')
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
      this.blogService.UploadImage(formData)
        .subscribe(res => {
          console.log(res);
          console.log("image result : ", res)
          this.blogService.formModel.patchValue({ imageUrl: res })
        },
          err => {
            console.error(err);
          })
    }
  }
}
