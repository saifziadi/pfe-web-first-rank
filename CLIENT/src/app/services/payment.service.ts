import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient,private formBuilder : FormBuilder) { 
    this.createFormModel()
  }
  BaseURI = environment.apiUrl+"payment";

  formModel : FormGroup



  UploadImage(file : File) {
    return this.http.post(this.BaseURI + '/avatar/',file);
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

  createNew(){
    delete this.formModel.value._id
    return this.http.post(this.BaseURI+'/create',this.formModel.value)
  }

  editById(id : string , body){
    return this.http.put(this.BaseURI+'/update/'+id,body)
  }

  deleteById(id){
    return this.http.delete(this.BaseURI+'/delete/'+id)
  }

  fillFormModel(body){
    this.formModel.patchValue({
      _id: body._id,
      firstname: body.firstname,
      lastname: body.lastname,
      address: body.address,
      toolId: body.toolId,
      imageUrl: body.imageUrl,
      status : body.status,
      createdAt: body.createdAt,
    })
  }

  createFormModel() {
    this.formModel = this.formBuilder.group({
      _id: '',
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      address: ['', [Validators.required]],
      toolId: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
      status : [false, [Validators.required]],
      createdAt: new Date(),
    })
  }
}
