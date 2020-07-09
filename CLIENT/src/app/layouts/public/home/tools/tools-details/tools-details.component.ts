import { NotificationsService } from './../../../../../services/notifications.service';
import { Component, ViewChild } from '@angular/core';
import { ToolService } from 'app/services/Tool.service';
import { Router } from '@angular/router';
import { ReviewService } from 'app/services/review.service';
import { NgForm } from '@angular/forms';
import { AccountService } from 'app/services/account.service';

@Component({
  selector: 'app-tools-details',
  templateUrl: './tools-details.component.html',
  styleUrls: ['./tools-details.component.css']
})
export class ToolsDetailsComponent {
  toolDetails: any = {};

  @ViewChild('regForm', {static: false}) myForm: NgForm;
  
  efficiencyRatingList : any = [
  { name : 1 , value : false},
  { name : 2 , value : false},
  { name : 3 , value : false},
  { name : 4 , value : false},
  { name : 5 , value : false},
  ]
  supportRatingList : any = [
  { name : 1 , value : false},
  { name : 2 , value : false},
  { name : 3 , value : false},
  { name : 4 , value : false},
  { name : 5 , value : false},
  ]
  priceRatingList : any = [
  { name : 1 , value : false},
  { name : 2 , value : false},
  { name : 3 , value : false},
  { name : 4 , value : false},
  { name : 5 , value : false},
  ]

  isConnected : boolean = false;
  reviews : any = [];

  constructor(
    private toolService: ToolService,
    private accountService: AccountService,
    private notificationsService: NotificationsService,
    private reviewService: ReviewService,
    private router: Router
    ) {
    if (!this.toolService.formModel.value._id) {
      this.router.navigateByUrl('/tool/list')
    } else {
      let token =this.accountService.getDecodedToken();
      if (token) {
        this.isConnected= true 
      }
      console.clear()
      this.getAllReviews()
      console.log("formModel : ", this.toolService.formModel.value)
      this.toolDetails = this.toolService.formModel.value
    }
    console.log(this.toolService.formModel.value);
  }

  getAllReviews(){
    this.reviewService.getAll()
    .subscribe((res:any)=>{
      if (res>3) {
        res.length = 3
      }
      this.reviews = res
      console.log("reviews : ",this.reviews);
      
    })
  }

  checkRating(name,title){
    if (title == 'efficiency') {
      this.efficiencyRatingList.map((val,index)=>{
        if (index+1 > name) {
          val.value = false
        }else{
          val.value = true
        }
      })
      this.reviewService.formModel.patchValue({efficiency : name})
    } 
    else if (title == 'support'){
      this.supportRatingList.map((val,index)=>{
        if (index+1 > name) {
          val.value = false
        }else{
          val.value = true
        }
      })
      this.reviewService.formModel.patchValue({support : name})
    }
    else if (title == 'price'){
      this.priceRatingList.map((val,index)=>{
        if (index+1 > name) {
          val.value = false
        }else{
          val.value = true
        }
      })
      this.reviewService.formModel.patchValue({price : name})
    }
  }

  onSubmit(){
    this.reviewService.createNew()
    .subscribe(res=>{
      console.log("res : ",res)
      this.resetForm()
      this.notificationsService.showNotification('success', 'Review Successfully Posted.')
    })
  }

  resetForm(){
    this.reviewService.formModel.reset(), 
    this.myForm.resetForm();
    this.efficiencyRatingList.map(x=>x.value = false)
    this.supportRatingList.map(x=>x.value = false)
    this.priceRatingList.map(x=>x.value = false)
  }

}
