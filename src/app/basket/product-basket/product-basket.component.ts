import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-basket',
  templateUrl: './product-basket.component.html',
  styleUrls: ['./product-basket.component.scss']
})
export class ProductBasketComponent implements OnInit {
  cardProducts: any[] =[];
  Total:any = 0
  ngOnInit(): void {
    this.getCartProduct()
  }

  getCartProduct(){
    if("cart" in localStorage){
      this.cardProducts = JSON.parse(localStorage.getItem("cart")!)
  }

  this.getCartTotal()
}

minsAmount(index:number){
  this.cardProducts[index].quantity--
  this.getCartTotal()
  localStorage.setItem("cart",JSON.stringify(this.cardProducts)) 

}

AddAmount(index:number){
  this.cardProducts[index].quantity++
  this.getCartTotal()
  localStorage.setItem("cart",JSON.stringify(this.cardProducts)) 
}
  getCartTotal(){
    this.Total = 0
    for(let x in this.cardProducts){
      this.Total += this.cardProducts[x].item.firstPrice * this.cardProducts[x].quantity;

    }
  }

  DeleteProduct(index:number){
    Swal.fire({
      title:'هل تريد حذف هذا المنتج ؟',
      icon:'warning',
      showCancelButton:true,
      cancelButtonText : 'لا احتفظ به',
      confirmButtonText:'نعم احذفه',
    }).then((res)=>{
      if(res.value){
        this.cardProducts.splice(index,1)
        this.getCartTotal()
        localStorage.setItem("cart",JSON.stringify(this.cardProducts)) 
        Swal.fire(
          'تم الحذف',
          'بنجاح'
        );
      } else if (res.dismiss == Swal.DismissReason.cancel){
        Swal.fire('تم الغاء الحذف')
      }
    })
  }

  clearCart(){
    Swal.fire({
      title:'هل تريد حذف هذه المنتجات ؟',
      icon:'warning',
      showCancelButton:true,
      cancelButtonText : 'لا احتفظ بها',
      confirmButtonText:'نعم احذفها',
    }).then((res)=>{
      if(res.value){
        this.cardProducts = []
        this.getCartTotal()
        localStorage.setItem("cart",JSON.stringify(this.cardProducts)) 
        Swal.fire(
          'تم الحذف',
          'بنجاح'
        );
      } else if (res.dismiss == Swal.DismissReason.cancel){
        Swal.fire('تم الغاء الحذف')
      }
    })
  }
}
