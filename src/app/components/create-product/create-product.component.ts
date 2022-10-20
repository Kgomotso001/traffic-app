import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products/products.service';
import { Router } from '@angular/router';
import { UsersService } from "../../services/users/users.service";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  productDetailsFormGroup: FormGroup;


  constructor(
    private _formBuilder: FormBuilder,
    private productSrvc: ProductsService,
    private router: Router,
    private usersService: UsersService,

  ) {

  }

  ngOnInit(): void {
    this.productDetailsFormGroup = this._formBuilder.group({
      comment: [null,
        [
          Validators.maxLength(255),
          Validators.minLength(2)
        ]
      ],
      status: ['', Validators.required],

    });

    this.usersService.getActiveUser().subscribe(
      resp => {
        console.log(resp);
      }
    )
  }


  updateProduct() {
    // return this.router.navigate(['dashboard/'])
    let report = {

    }
  }


}
