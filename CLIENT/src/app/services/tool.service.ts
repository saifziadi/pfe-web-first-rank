import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'environments/environment';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { PaymentComponent } from 'app/layouts/public/home/payment/payment.component';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ToolService {
  constructor(private http: HttpClient,private formBuilder : FormBuilder,
    private dialog: MatDialog,
    ) {
    this.createFormModel()
  }
  BaseURI = environment.apiUrl+"tool";

  toolName = ""

  formModel : FormGroup

  fillToolName(name){
    this.toolName = name
  }
  fillTools(tools){
    this.allTools = tools
  }
  
  allTools : any = []

  
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  cardsObs: Observable<any>;

  applyFilter() {
    let value = this.toolName.trim().toLowerCase().toString()
    console.log(value);
    let res = []
    res =this.allTools.map(x=>x.title.includes(this.toolName))
    this.dataSource = new MatTableDataSource<any>(res);
    this.cardsObs = this.dataSource.connect();
  }

  fillFormModel(body){
    this.formModel.patchValue({
      _id: body._id,
      title: body.title,
      description: body.description,
      price: body.price,
      rate: body.rate,
      imageUrl: body.imageUrl,
      categorie: body.categorie,
      status : body.status,
      createdAt: body.createdAt,
    })
  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.height ="800px"
    dialogConfig.width ="600px"

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(PaymentComponent, dialogConfig);
}



  createFormModel() {
    this.formModel = this.formBuilder.group({
      _id: '',
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      imageUrl: '',
      rate: ['', [Validators.required]],
      categorie: ['', [Validators.required]],
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

  GroupedByCategory(){
    return this.http.get(this.BaseURI+'/GroupedByCategory')
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
