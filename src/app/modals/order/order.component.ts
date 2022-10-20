import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {


  status;
  order;
  loading = true;
  success = null;

  constructor(
    public dialogRef: MatDialogRef<OrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
    private orderSrvc: OrdersService,
    private _snackBar: MatSnackBar,
  ) {

    this.order = data['order'];
    this.status = data['status'];
    this.createOrder(this.status);

  }

  ngOnInit(): void {

  }

  createOrder(payment) {
    let order = this.order;
    let id = this.order.orderId;

    if (payment) {
      delete order.createdAt;
      delete order.updatedAt;
      delete order.orderId;
      delete order.totalAmount;
      this.order.status = "PAID";
      //this.alert('Payment successsful')
      this.orderSrvc.updateOrder(id, order).then(
        resp => {
          //  console.log(resp);
          this.success = true;
          this.loading = false;
        }
      ).catch(
        error => {
          //console.log(error);
          this.success = false;
          this.loading = false;
        }

      )
    } else {
      this.success = false;
      this.loading = false;
    }

  }

  alert(msg) {
    this._snackBar.open(msg, "", {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['custom-snackbar']
    });
  }

}
