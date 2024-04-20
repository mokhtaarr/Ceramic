import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ComplaintService } from '../Services/complaint.service';

@Component({
  selector: 'app-user-complaints',
  templateUrl: './user-complaints.component.html',
  styleUrls: ['./user-complaints.component.scss']
})
export class USerComplaintsComponent {

 selectFile ?: File ;
 selectedImage: any;

  constructor(private fb:FormBuilder,private complaintService : ComplaintService ){

  }

  ComplaintForm = this.fb.group({

    ComDesc:['',[
      Validators.required,
      Validators.minLength(20), 
      Validators.maxLength(300),
     ]],

     phone:['', [
      Validators.required,
      Validators.minLength(11) ,Validators.maxLength(11),Validators.pattern(/^0[0-9]{10}$/),
    ]],

   email:['',
    [
      Validators.required,
      Validators.minLength(10), 
      Validators.maxLength(100), 
      Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/),
    ]
    ],  

    Image: ['',Validators.required], 

  
  });

  onFileSelected(event:any){
    this.selectFile = <File> event.target.files[0];

    if (this.selectFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
      };
      reader.readAsDataURL(this.selectFile);
    }


   }

  onSubmit(){

    const formData = new FormData();
    const comDescValue = this.ComplaintForm.value.ComDesc ?? ''; 
    const phoneValue = this.ComplaintForm.value.phone ?? ''; 
    const emailValue = this.ComplaintForm.value.email ?? ''; 
    const file: Blob = this.selectFile ?? new Blob();

    formData.append('ComDesc', comDescValue);
    formData.append('phone', phoneValue);
    formData.append('email', emailValue);
    formData.append('image', file, this.selectFile?.name);

  this.complaintService.AddingComplaint(formData).subscribe({});
  }


}
