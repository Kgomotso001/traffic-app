import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProductsService } from 'src/app/services/products/products.service';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users/users.service';
import { ReportsService } from 'src/app/services/reports/reports.service';
@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
  productDetailsFormGroup: FormGroup;

  user;
  location;
  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private usersService: UsersService,
    private reportsServices: ReportsService
  ) {
    this.usersService.getActiveUser().subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    this.getLocation();
    this.productDetailsFormGroup = this._formBuilder.group({
      comment: [null, [Validators.maxLength(255), Validators.minLength(2)]],
      status: ['', Validators.required],
    });

    this.usersService.getActiveUser().subscribe((resp) => {
      this.user = resp;
      console.log(this.user);

    });
  }

  updateProduct() {
    // return this.router.navigate(['dashboard/'])
    let report = {
      userId: this.user.userId,
      incident: this.productDetailsFormGroup.value.status,
      comment: this.productDetailsFormGroup.value.comment,
      location: {
        latitude: this.location.latitude,
        longitude: this.location.longitude,
      },
    };
    //// console.log(report);
    this.reportsServices
      .createReport(report)
      .then((resp) => {
        ////console.log(resp);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getLocation() {
    const successCallback = (position) => {
      ////console.log(position);
      this.location = position.coords;
      ////console.log(this.location);
    };

    const errorCallback = (error) => {
      console.log(error);
    };
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }
}
