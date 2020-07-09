import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  constructor(private http: HttpClient,private formBuilder : FormBuilder) { 
    this.createFormModel()
  }
  BaseURI = environment.apiUrl+"review";
  formModel : FormGroup

  fillFormModel(body){
    this.formModel.patchValue({
      _id: body._id,
      support: body.support,
      efficiency: body.efficiency,
      price: body.price,
      comment: body.comment, 
      status : body.status,
      createdAt: body.createdAt,
    })
  }

  createFormModel() {
    this.formModel = this.formBuilder.group({
      _id: '',
      support: ['', [Validators.required]],
      efficiency: ['', [Validators.required]],
      price: ['', [Validators.required]],
      comment: ['', [Validators.required]],
      status : [false, [Validators.required]],
      createdAt: [new Date(), [Validators.required]],
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
    delete this.formModel.value._id
    return this.http.post(this.BaseURI+'/create',this.formModel.value)
  }

  editById(id : string , body){
    return this.http.put(this.BaseURI+'/update/'+id,body)
  }

  deleteById(id){
    return this.http.delete(this.BaseURI+'/delete/'+id)
  }
}
