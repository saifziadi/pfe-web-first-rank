import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient,private formBuilder : FormBuilder) { 
    this.createFormModel()
  }
  BaseURI = environment.apiUrl+"message";

  formModel : FormGroup

  createFormModel() {
    this.formModel = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      subject: ['', [Validators.required]],
      content: ['', [Validators.required]],
     
    })
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
    return this.http.post(this.BaseURI+'/create',this.formModel.value)
  }

  editById(id : string , body){
    return this.http.put(this.BaseURI+'/update/'+id,body)
  }

  deleteById(id){
    return this.http.delete(this.BaseURI+'/delete/'+id)
  }
}
