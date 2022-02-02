import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpDataService } from '../services/http-data.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  selectedtype!: string;
  productVari: string[] = ['Brand New', 'Old', 'Second Hand', 'Refurnished'];
  productForm!:FormGroup
  constructor(private formbuild:FormBuilder, private httpdataserv:HttpDataService) { }

  ngOnInit(): void {
    this.productForm = this.formbuild.group({
      productName:['',Validators.required],
      category:['',Validators.required],
      freshness:['',Validators.required],
      price:['',Validators.required],
      comment:['',Validators.required],
      date:['',Validators.required],
    })
  }
 
  addProduct()
    {
      if(this.productForm.valid) {
       this.httpdataserv.postProDuct(this.productForm.value).subscribe(data => {
         alert("Product successfully added")
       },err=>{
         alert("Error adding product")
       })   
      }
     console.log(this.productForm.value);
    }

}
