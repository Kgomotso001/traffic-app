import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { ProductsService } from 'src/app/services/products/products.service';
import { SignPostService } from 'src/app/services/signPost/sign-post.service';
import { UsersService } from 'src/app/services/users/users.service';
import { VouchersService } from 'src/app/services/vouchers/vouchers.service';
import { UsersComponent } from '../dashboard/users/users.component';
import { ReportsComponent } from '../dashboard/reports/reports.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('chartRef', { static: true }) private chartRef;
  chart;

  displayedColumns: string[] = [
    'productCode',
    'status',
    'price',
    'createdAt',
    'updatedAt',
    'action',
  ];
  dataSource;
  product;

  stats = {
    total: 0,
    sold: 0,
    available: 0,
    revenue: 0,
  };

  hotspotsPrivate = [
    // {
    //     propertyId: "ced3bc57-a4bc-41e6-9b48-782c249fe044",
    //     "propertyName": "Riviera Varsity Lodge",
    //     "geoLocation": {
    //         "latitude": -26.58495,
    //         "longitude": 28.02231
    //     },
    //     "weight": 0.9
    // },
    // {
    //     "propertyId": "95f02764-c9d7-4966-a3e0-c1456a69e482",
    //     "propertyName": "Miami Building",
    //     "geoLocation": {
    //         "latitude": 0,
    //         "longitude": 0
    //     },
    //     "weight": 0
    // },
    // {
    //     "propertyId": "7f763d29-57d5-4442-ac3e-0f474d6445d2",
    //     "propertyName": "Nomndeni Lodge 1",
    //     "geoLocation": {
    //         "latitude": -25.498156,
    //         "longitude": 30.9899791
    //     },
    //     "weight": 0.3
    // },
    // {
    //     "propertyId": "697c0402-8c06-4694-bc4c-2b8d5efd02fc",
    //     "propertyName": "Old Hebron College of Education",
    //     "geoLocation": {
    //         "latitude": -25.5126819,
    //         "longitude": 28.0552803
    //     },
    //     "weight": 0
    // },
    // {
    //     "propertyId": "7bce9374-9b6c-48a5-900c-4583c77f02bb",
    //     "propertyName": "Respublica West City",
    //     "geoLocation": {
    //         "latitude": -25.7556031,
    //         "longitude": 28.11672
    //     },
    //     "weight": 0
    // },
    // {
    //     "propertyId": "35389abf-5007-4bf4-8522-84497a161f84",
    //     "propertyName": "Tshwane Varsity Lodge 2",
    //     "geoLocation": {
    //         "latitude": -25.7414709,
    //         "longitude": 28.15231
    //     },
    //     "weight": 0
    // },
    // {
    //     "propertyId": "bc459efb-f4bb-4bb6-a181-90774d3ca162",
    //     "propertyName": "Everest Towers",
    //     "geoLocation": {
    //         "latitude": 0,
    //         "longitude": 0
    //     },
    //     "weight": 0.3
    // },
    // {
    //     "propertyId": "5f84f406-3e2e-46a5-9022-4ab41fd48ee6",
    //     "propertyName": "Muzinda",
    //     "geoLocation": {
    //         "latitude": -25.7599894,
    //         "longitude": 28.1377809
    //     },
    //     "weight": 0
    // },
    // {
    //     "propertyId": "80380203-18c6-4c71-8b9f-13cc5d00644f",
    //     "propertyName": "Arebeng 2",
    //     "geoLocation": {
    //         "latitude": 0,
    //         "longitude": 0
    //     },
    //     "weight": 0.3
    // }
  ];

  price;

  selectedfile;
  results;
  filename;
  fileExtension = null;
  userCount;

  loading = true;

  selectedComponent;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private _snackBar: MatSnackBar,
    private signPostSrvc: SignPostService,
    private productSrvc: ProductsService,
    private userSrvc: UsersService,
    private router: Router
  ) {
    this.userSrvc.getActiveUser().subscribe((user) => {
      //console.log(user);
      if (!user || user.role != 'ADMIN') {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnInit() {
    this.productSrvc
      .getProducts()
      .then((resp) => {
        // tslint:disable-next-line: comment-format
        //console.log(resp);
        if (resp.products.length > 0) {
          // tslint:disable-next-line: prefer-const
          let products = resp.products;
          console.table(products);
          this.statsGenerator(products);
          this.dataSource = new MatTableDataSource<any>(products);
          this.dataSource.paginator = this.paginator;
          this.loading = false;
        }
      })
      .then((error) => {
        // tslint:disable-next-line: comment-format
        //console.log(error);
      });
    this.getUsers();
  }
  getUsers() {
    this.loading = true;
    this.userSrvc
      .getUsers()
      .then((resp) => {
        this.userCount = resp.count;
        console.log(this.userCount);
      })
      .catch((error) => {
        this.loading = false;
      });
  }

  applyFilter(event) {
    const filterValue = event.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  statsGenerator(vouchers) {
    this.stats = {
      total: 0,
      sold: 0,
      available: 0,
      revenue: 0,
    };

    for (let index = 0; index < vouchers.length; index++) {
      const element = vouchers[index];

      if (element.status === 'DISPENSED') {
        this.stats.sold++;
      }
    }

    this.stats.total = vouchers.length;
    this.stats.available = this.stats.total - this.stats.sold;
    this.stats.revenue = this.stats.sold * this.price;
  }

  onFileSelected(event) {
    let selectedfile = event.target.files[0];
    let filename = selectedfile.name;
    filename = filename.split('.');

    this.selectedfile = selectedfile;

    let fileExtension = filename[filename.length - 1];
    this.fileExtension = fileExtension;
    // tslint:disable-next-line: comment-format
    ////console.log(this.fileExtension);

    if (fileExtension != 'xlsx' && fileExtension != 'xlsb') {
      this.openSnackBar('Only excel files are supported', 'Close');
      return;
    }
    this.loading = true;
    this.getUrl(selectedfile, fileExtension);
  }

  getUrl(selectedfile, fileExtension) {
    //this.loader = true;
    let dataObject;
    let formData: any = new FormData();
    this.signPostSrvc.getpresignedurls(fileExtension).then((res) => {
      dataObject = res;

      Object.keys(dataObject.presignedPost.fields).forEach((key) => {
        formData.append(key, dataObject.presignedPost.fields[key]);
      });

      formData.append('file', selectedfile);
      this.uploadFile(dataObject.presignedPost.url, formData);
    });
  }

  uploadFile(url, formData) {
    this.signPostSrvc
      .uploadFile(url, formData)
      .then((resp) => {
        // tslint:disable-next-line:comment-format
        //this.loader = false;
        // tslint:disable-next-line:comment-format
        //console.log(resp);
        // this.getVouchers();
        this.openSnackBar('Funding Records Uploaded Successful', 'Close');
      })
      .catch((error) => {
        // tslint:disable-next-line: comment-format
        //this.loader = false;
        // tslint:disable-next-line: comment-format
        //console.log(error);
        this.loading = true;
        this.openSnackBar(
          'Something went wrong, please contact support',
          'Close'
        );
      });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5500,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }

  deleteProduct(id) {
    this.productSrvc.getDeleteProduct(id).then((resp) => {
      console.log(resp);
    });
  }
  updateProduct(product) {
    return this.router.navigate(['edit-product/'], {
      state: { data: product },
    });
    // this.productSrvc.getUpdateProduct(id,this.product).then(resp => {
    //   console.log(resp);
    //  }
    // )
  }

  createProduct() {
    return this.router.navigate(['create-product/']);
    // this.productSrvc.getUpdateProduct(id,this.product).then(resp => {
    //   console.log(resp);
    //  }
    // )
  }

  assignComponent(component: string) {
    if (component === 'users') {
      this.selectedComponent = UsersComponent;
    } else if (component === 'reports') {
      this.selectedComponent = ReportsComponent;
    }
  }
}
