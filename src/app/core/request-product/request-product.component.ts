import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductRequestService } from '../Services/product-request.service';

@Component({
  selector: 'app-request-product',
  templateUrl: './request-product.component.html',
  styleUrls: ['./request-product.component.scss']
})
export class RequestProductComponent {

  selectFile ?: File ;
  selectedImage: any;

  
  constructor(private fb:FormBuilder,private PrdRequestService : ProductRequestService ){

  }

  ProductForm = this.fb.group({

    ProductNameAr:['',[
      Validators.required,
      Validators.minLength(5), 
      Validators.maxLength(20),
     ]],

     ProductDescA:['',[
      Validators.required,
      Validators.minLength(5), 
      Validators.maxLength(50),
     ]],

     Price:['',[
      Validators.required,
      Validators.maxLength(5),
      Validators.pattern(/^\d*$/), // يقبل الأرقام فقط

     ]],

     phone:['', [
      Validators.required,
      Validators.minLength(11) ,Validators.maxLength(11),Validators.pattern(/^0[0-9]{10}$/),
    ]],


    Image: ['',Validators.required], // إضافة حقل لرابط الصورة

  
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
    const ProductNameArValue = this.ProductForm.value.ProductNameAr ?? ''; // قم بتحديد قيمة افتراضية في حالة كانت قيمة ComDesc هي null أو undefined
    const ProductDescAValue = this.ProductForm.value.ProductDescA ?? ''; // قم بتحديد قيمة افتراضية في حالة كانت قيمة ComDesc هي null أو undefined
    const PriceValue = this.ProductForm.value.Price ?? ''; // قم بتحديد قيمة افتراضية في حالة كانت قيمة ComDesc هي null أو undefined
    const PhoneValue = this.ProductForm.value.phone ?? ''; // قم بتحديد قيمة افتراضية في حالة كانت قيمة ComDesc هي null أو undefined
    const file: Blob = this.selectFile ?? new Blob();

    formData.append('ProductNameAr', ProductNameArValue);
    formData.append('ProductDescA', ProductDescAValue);
    formData.append('Price', PriceValue);
    formData.append('Phone', PhoneValue);
    formData.append('image', file, this.selectFile?.name);

  this.PrdRequestService.AddingProduct(formData).subscribe({});
  }


}
