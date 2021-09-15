import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'app/services/notifications.service';
import { Router } from '@angular/router';
import { BlogService } from 'app/services/blog.service';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css']
})
export class BlogEditComponent {
  constructor(public blogService : BlogService,
    private notificationsService :NotificationsService,
    private router : Router) {
    if (!this.blogService.formModel.value._id) {
      this.router.navigateByUrl('blogs/list')
    }else{
      // console.log("formModel : ",this.blogService.formModel.value) 
    }
   }

  onSubmit(){
    console.log("this.formModel.value : ",this.blogService.formModel.value)
    this.blogService.editById(this.blogService.formModel.value._id,this.blogService.formModel.value)
    .subscribe(response=>{
      console.log("Edited successfully : ",response)
      this.notificationsService.showNotification('success','Successful Edition - blog Successfully Edited.')
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
      this.blogService.UpdateImage(formData)
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
