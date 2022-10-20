import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products/products.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  product = null;

  productDetailsFormGroup: FormGroup;


  constructor(
    private _formBuilder: FormBuilder,
    private productSrvc: ProductsService,
    private router: Router

  ) {
    this.product = history.state.data;
    
  }

  ngOnInit(): void {
    this.productDetailsFormGroup = this._formBuilder.group({
      productCode: [null,
        [
          Validators.required,
          Validators.maxLength(255),
          Validators.minLength(2)
        ]
      ],
      status: ['', Validators.required],
      price: ['', Validators.required],

    });
    this.setVal();

  }

  setVal(){
    this.productDetailsFormGroup.setValue({
      productCode: this.product?.productCode,
      status: this.product?.status,
      price: this.product?.price,

    });
  }
  updateProduct(){
    console.log(this.product.productId);
    
    let updatedProduct = {
      "productCode": this.productDetailsFormGroup.value.productCode,
    "status": this.productDetailsFormGroup.value.status,
    "price": this.productDetailsFormGroup.value.price
    }
    this.productSrvc.getUpdateProduct(this.product.productId,updatedProduct).then(resp => {
      console.log(resp);
      return this.router.navigate(['dashboard/'] )
     }
    )
  }


}
