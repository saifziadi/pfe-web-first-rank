import { Injectable } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  constructor(private http: HttpClient,private formBuilder : FormBuilder) { 
    this.createFormModel()
  }
  BaseURI = environment.apiUrl+"blog";

  formModel : FormGroup

  fillFormModel(body){
    this.formModel.patchValue({
      _id: body._id,
      title: body.title,
      content: body.content,
      imageUrl: body.imageUrl,
      status : body.status,
      createdAt: body.createdAt,
    })
  }

  createFormModel() {
    this.formModel = this.formBuilder.group({
      _id: '',
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
      status : [false, [Validators.required]],
      createdAt: [new Date(), [Validators.required]],
    })
  }

  UploadImage(file : File) {
    return this.http.post(this.BaseURI + '/avatar/',file);
  }

  UpdateImage(file : File) {
    return this.http.put(this.BaseURI + '/avatar/update/'+this.formModel.value._id,file);
  }

  getAll(){
    return this.http.get(this.BaseURI+'/getAll')
  }
  
  getById(id : string){
    return this.http.get(this.BaseURI+'/'+id)
  }

  checkExists(id : string){
    return this.http.get(this.BaseURI+'/check/'+id)
  }

  createNew(body){
    delete this.formModel.value._id
    return this.http.post(this.BaseURI+'/create',body)
  }

  editById(id : string , body){
    return this.http.put(this.BaseURI+'/update/'+id,body)
  }

  deleteById(id){
    return this.http.delete(this.BaseURI+'/delete/'+id)
  }
}
