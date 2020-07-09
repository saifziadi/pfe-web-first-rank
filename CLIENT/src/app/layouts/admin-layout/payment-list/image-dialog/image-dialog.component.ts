import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentService } from 'app/services/payment.service';

@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.css']
})
export class ImageDialogComponent implements OnInit {

  imageUrl : string = ""
  constructor(
    private paymentservice: PaymentService,
    private dialogRef: MatDialogRef<ImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      console.log("data : ",data)
      this.imageUrl=data
     }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

}
