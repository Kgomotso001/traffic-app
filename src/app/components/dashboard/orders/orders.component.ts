import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OrdersService } from 'src/app/services/orders/orders.service';

@Component({
  selector: 'app-orders',
  template: `
  <div id="controls">
  <mat-form-field appearance="outline">
    <mat-label>Filter by status</mat-label>
    <mat-select (selectionChange)="applyFilter($event)">
      <mat-option value="">
        ALL
      </mat-option>
      <mat-option value="PAID">
      PAID
      </mat-option>
      <mat-option value="AWAITING_PAYMENT">
      AWAITING_PAYMENT
      </mat-option>
    </mat-select>
  </mat-form-field>
<!--<button mat-stroked-button (click)="inputfile.click()" color="primary">UPLOAD VOUCHERS</button> -->
 
</div>

<mat-progress-bar mode="query" *ngIf="loading"></mat-progress-bar>
<table mat-table [dataSource]="dataSource" matSort >

  <ng-container matColumnDef="user">
    <th mat-header-cell *matHeaderCellDef> User </th>
    <td mat-cell *matCellDef="let element"> {{element?.user?.firstName + ' ' + element?.user?.lastName | titlecase}} </td>
  </ng-container>

  <!-- Name Column -->
  <ng-container matColumnDef="status">
    <th mat-header-cell *matHeaderCellDef> Status </th>
    <td mat-cell *matCellDef="let element"> {{element.status}} </td>
  </ng-container>

  <!-- Weight Column -->
  <ng-container matColumnDef="createdAt">
    <th mat-header-cell *matHeaderCellDef mat-sort-header> Date Added </th>
    <td mat-cell *matCellDef="let element"> {{element.createdAt  | date}} </td>
  </ng-container>

  <!-- Symbol Column -->
  <ng-container matColumnDef="updatedAt">
    <th mat-header-cell *matHeaderCellDef mat-sort-header> Date Modified </th>
    <td mat-cell *matCellDef="let element"> {{element.updatedAt | date}} </td>
  </ng-container>


  <!-- Symbol Column -->
  <ng-container matColumnDef="details">
    <th mat-header-cell *matHeaderCellDef> Actions </th>
    <td mat-cell *matCellDef="let element"> <button mat-stroked-button >VIEW MORE</button> </td>
  </ng-container>

  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
</table>
<mat-paginator [pageSizeOptions]="[5, 10, 20]" showFirstLastButtons></mat-paginator>
  `,
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  displayedColumns: string[] = ['user', 'status', 'createdAt', 'updatedAt'];
  dataSource;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  loading = true;
  constructor(
    private orderSrvc: OrdersService
  ) {
    //console.log('hey');

  }

  ngOnInit(): void {

    this.orderSrvc.getAllOrder().then(
      resp => {
        //console.log(resp);
        this.dataSource = new MatTableDataSource<any>(resp.orders);
        this.loading = false;
        this.dataSource.paginator = this.paginator;
      }
    ).catch(
      error => {
        //console.log(error);

      }
    );
  }
  applyFilter(event) {
    const filterValue = event.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
