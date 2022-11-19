import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Platform } from '@angular/cdk/platform';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingComponent } from 'src/app/modals/loading/loading.component';
import { LoginComponent } from 'src/app/modals/login/login.component';
import { OrderComponent } from 'src/app/modals/order/order.component';
import { PaymentComponent } from 'src/app/modals/payment/payment.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CryptojsService } from 'src/app/services/cryptojs/cryptojs.service';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { UsersService } from 'src/app/services/users/users.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

declare var $: any;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  product;
  user = null;
  displayedColumns: string[] = [
    'productCode',
    'status',
    'price',
    'createdAt',
    'updatedAt',
  ];
  dataSource;

  order = {
    status: null,
    createdAt: null,
    item: null,
  };

  processedOrder;

  unpaidOrder = null;

  amountDue = 0;
  splash = true;
  loading = false;
  term = '3';
  hotspotsPrivate = [
    {
      propertyId: 'ced3bc57-a4bc-41e6-9b48-782c249fe044',
      propertyName: 'Riviera Varsity Lodge',
      geoLocation: {
        latitude: -26.58495,
        longitude: 28.02231,
      },
      weight: 0.9,
    },
    {
      propertyId: '95f02764-c9d7-4966-a3e0-c1456a69e482',
      propertyName: 'Miami Building',
      geoLocation: {
        latitude: 0,
        longitude: 0,
      },
      weight: 0,
    },
    {
      propertyId: '7f763d29-57d5-4442-ac3e-0f474d6445d2',
      propertyName: 'Nomndeni Lodge 1',
      geoLocation: {
        latitude: -25.498156,
        longitude: 30.9899791,
      },
      weight: 0.3,
    },
    {
      propertyId: '697c0402-8c06-4694-bc4c-2b8d5efd02fc',
      propertyName: 'Old Hebron College of Education',
      geoLocation: {
        latitude: -25.5126819,
        longitude: 28.0552803,
      },
      weight: 0,
    },
    {
      propertyId: '7bce9374-9b6c-48a5-900c-4583c77f02bb',
      propertyName: 'Respublica West City',
      geoLocation: {
        latitude: -25.7556031,
        longitude: 28.11672,
      },
      weight: 0,
    },
    {
      propertyId: '35389abf-5007-4bf4-8522-84497a161f84',
      propertyName: 'Tshwane Varsity Lodge 2',
      geoLocation: {
        latitude: -25.7414709,
        longitude: 28.15231,
      },
      weight: 0,
    },
    {
      propertyId: 'bc459efb-f4bb-4bb6-a181-90774d3ca162',
      propertyName: 'Everest Towers',
      geoLocation: {
        latitude: 0,
        longitude: 0,
      },
      weight: 0.3,
    },
    {
      propertyId: '5f84f406-3e2e-46a5-9022-4ab41fd48ee6',
      propertyName: 'Muzinda',
      geoLocation: {
        latitude: -25.7599894,
        longitude: 28.1377809,
      },
      weight: 0,
    },
    {
      propertyId: '80380203-18c6-4c71-8b9f-13cc5d00644f',
      propertyName: 'Arebeng 2',
      geoLocation: {
        latitude: 0,
        longitude: 0,
      },
      weight: 0.3,
    },
  ];

  url = window.location.protocol + '//' + window.location.hostname;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private productSrvc: ProductsService,
    private userSrvc: UsersService,
    private authSrvc: AuthService,
    private orderSrvc: OrdersService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cryptoSrvc: CryptojsService,
    private platform: Platform,
    private breakpointObserver: BreakpointObserver
  ) {
    ////console.log(platform);

    breakpointObserver
      .observe([Breakpoints.HandsetLandscape, Breakpoints.HandsetPortrait])
      .subscribe((result) => {
        ////console.log(result);
        // if (result.matches) {
        // }
      });

    this.url =
      this.url.indexOf('localhost') >= 0
        ? this.url + ':4200' + '/#/payment/'
        : this.url + '/#/payment/';
    this.url = encodeURIComponent(this.url);

    this.productSrvc
      .getProducts()
      .then((resp) => {
        //////console.log(resp);
        if (resp.products.length > 0) {
          this.product = resp.products[0];
        }
      })
      .then((error) => {
        // ////console.log(error);
      });

    this.userSrvc.getActiveUser().subscribe((resp) => {
      if (resp) {
        // ////console.log('Active user');
        // ////console.log(resp);
        this.user = resp;

        this.amountDue = this.amountDue > 0 ? this.amountDue : 0;

        if (this.user.busketItems.length > 0) {
          this.order.item = this.user.busketItems[0];
          this.order.item.price = parseFloat(this.order.item.price);
          this.amountDue = this.order.item.totalPrice;
          this.term = this.order.item.subscriptionPeriod.toString();
        }

        if (localStorage.getItem('orderKeys')) {
          this.getRef();
        }
      } else {
        this.user = null;
        this.order = {
          status: null,
          createdAt: null,
          item: null,
        };

        this.processedOrder = null;
        this.unpaidOrder = null;
        this.amountDue = 0;
      }
    });

    this.authSrvc
      .authState()
      .then((resp) => {
        this.getUnpaidVouchers();
        // this.splash = false;
      })
      .catch((error) => {
        this.splash = false;
      });
  }
  mobile;
  ngOnInit(): void {
    this.getLocation();

    $(window).ready(function () {
      $('#grid .card').click(function () {
        if ($(this).hasClass('expanded')) {
          $(this).removeClass('expanded');
        } else {
          $(this).addClass('expanded');
        }
      });

      $('#expandMenu').click(function () {
        if ($('#menu-items').hasClass('expanded-menu')) {
          $('#menu-items').removeClass('expanded-menu');
        } else {
          $('#menu-items').addClass('expanded-menu');
        }
      });

      $('#menu-items li').click(function () {
        if ($('#menu-items').hasClass('expanded-menu')) {
          $('#menu-items').removeClass('expanded-menu');
        } else {
          $('#menu-items').addClass('expanded-menu');
        }
      });
    });

    if (window.innerWidth < 680) {
      this.mobile = true;
    }
    this.productSrvc
      .getProducts()
      .then((resp) => {
        //console.log(resp);
        if (resp.products.length > 0) {
          let products = resp.products;
          console.table(products);
          this.dataSource = new MatTableDataSource<any>(products);
          this.dataSource.paginator = this.paginator;
          this.loading = false;
        }
      })
      .then((error) => {
        //console.log(error);
      });
  }

  getRef() {
    this.activatedRoute.params.subscribe((resp) => {
      let id = resp.id;

      if (id) {
        let keys = JSON.parse(
          this.cryptoSrvc.decrypt(localStorage.getItem('orderKeys'))
        );
        this.processedOrder = JSON.parse(
          this.cryptoSrvc.decrypt(localStorage.getItem('order'))
        );
        localStorage.removeItem('orderKeys');

        if (id === keys.success) {
          this.orderModal(true);
          this.router.navigate(['/']);
        } else if (id === keys.cancel) {
          this.orderModal(false);
          this.router.navigate(['/']);
        } else {
          this.router.navigate(['/']);
        }
      }
    });
  }

  updateBucketList() {
    if (!this.user) {
      return;
    }

    let id = this.user.userId;
    let user = {
      role: this.user.role,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      busketItems: [this.order.item],
    };

    ////console.log(user);

    return new Promise((resolve, reject) => {
      this.userSrvc
        .updateUser(id, user)
        .then((resp) => {
          //////console.log(resp);
          this.createOrder()
            .then((resp) => resolve(resp))
            .catch((error) => reject(error));

          this.userSrvc.setActiveUser(resp);

          // this.createOrder();
        })
        .catch((error) => {
          ////console.log(error);
          reject(error);
        });
    });
  }

  createOrder() {
    let order = {
      userId: this.user.userId,
      status: null,
    };

    return new Promise((resolve, reject) => {
      order.status = 'AWAITING_PAYMENT';

      if (this.unpaidOrder) {
        let order = this.unpaidOrder;
        let id = this.unpaidOrder['orderId'];

        delete order.createdAt;
        delete order.updatedAt;
        delete order.orderId;
        delete order.totalAmount;
        //////console.log(order);

        this.orderSrvc
          .updateOrder(id, order)
          .then((resp) => {
            this.processedOrder = resp;
            resolve(resp);
          })
          .catch((error) => {
            //////console.log(error);
            reject(error);
          });
      } else {
        this.orderSrvc
          .createOrder(order)
          .then((resp) => {
            this.processedOrder = resp;
            resolve(resp);
          })
          .catch((error) => {
            //////console.log(error);
            reject(error);
          });
      }
    });
  }

  orderModal(status) {
    //console.log(status);

    this.dialog
      .open(OrderComponent, {
        panelClass: 'custom-dialog-container',
        data: {
          order: this.processedOrder,
          status: status,
          autoFocus: false,
          disableClose: true,
        },
      })
      .afterClosed()
      .subscribe((obsv) => {
        this.userSrvc.getActiveUser().subscribe((resp) => {
          //this.user = resp;
          // //////console.log(this.user);

          this.getUnpaidVouchers();
        });
      });
  }

  removeFromCart() {
    if (this.order.item == null) {
      this.alert('Cart empty.');
      return;
    } else if (this.order.item.quantity == 0) {
      this.alert('Cart empty.');
      return;
    }

    this.order.item.quantity--;
    this.updateValues();
  }

  addToCart() {
    if (this.order.item == null) {
      this.order.item = {
        totalPrice: 0,
        productCode: this.product.productCode,
        id: this.product.productId,
        quantity: 0,
        subscriptionPeriod: parseInt(this.term),
      };
    }

    ////console.log(this.order);

    this.order.item.quantity++;
    this.updateValues();
  }

  updateValues() {
    if (this.order.item == null) {
      this.order.item = {
        totalPrice: 0,
        productCode: this.product.productCode,
        id: this.product.productId,
        quantity: 0,
        subscriptionPeriod: parseInt(this.term),
      };
    }

    this.amountDue =
      this.order.item.quantity *
      (parseFloat(this.product.price) * parseFloat(this.term));
    this.order.item.totalPrice = this.amountDue;
    this.order.item.subscriptionPeriod = parseInt(this.term);
  }

  alert(msg) {
    this._snackBar.open(msg, '', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['custom-snackbar'],
    });
  }

  login(str) {
    this.dialog
      .open(LoginComponent, {
        data: { type: str },
        panelClass: 'custom-dialog-container',
      })
      .afterClosed()
      .subscribe((obsv) => {
        this.userSrvc.getActiveUser().subscribe((resp) => {
          this.user = resp;
          if (this.user) {
          }
        });
      });
  }

  cancelOrder(order) {
    //////console.log(order);
  }

  getUnpaidVouchers() {
    this.orderSrvc
      .getOrderByUserId(this.user.userId)
      .then((resp) => {
        ////console.log(resp);
        if (resp.orders.length > 0) {
          this.order.item = resp.orders[0].items[0];
          this.amountDue = this.order.item.totalPrice;
          this.unpaidOrder = resp.orders[0];

          ////console.log(this.unpaidOrder);
          ////console.log(this.order.item);

          this.splash = false;
        } else {
          //////console.log('no oder');
          this.order = {
            status: null,
            createdAt: null,
            item: null,
          };
          this.splash = false;
        }
      })
      .catch((error) => {
        //////console.log(error);
        this.splash = false;
      });
  }

  b2bForm() {
    this.dialog
      .open(PaymentComponent, {
        panelClass: 'custom-dialog-container',
      })
      .afterClosed()
      .subscribe((obsv) => {
        // this.userSrvc.getActiveUser().subscribe(
        //   resp => {
        //     this.user = resp;
        //     //////console.log(this.user);
        //     this.getUnpaidVouchers();
        //   }
        // );
      });
  }

  orderKeys;

  loadingCheckout = false;
  hashKey(payFast) {
    if (!this.user) {
      this.alert('Login or Register before you proceed to checkout');
      return;
    }

    this.dialog.open(LoadingComponent, {
      panelClass: 'custom-dialog-container',
      data: {
        autoFocus: false,
        disableClose: true,
      },
    });

    this.updateBucketList()
      .then((resp) => {
        //////console.log(resp);

        let timestamp = Date.now();
        let splitUserId = this.user.userId.split('-');

        let successCode =
          Math.floor(Math.random() * 10) + '' + Math.floor(Math.random() * 10);
        let cancelCode =
          Math.floor(Math.random() * 10) + '' + Math.floor(Math.random() * 10);
        let key = timestamp + splitUserId[1];

        this.orderKeys = {
          success: key + successCode,
          cancel: key + cancelCode,
        };

        localStorage.setItem(
          'orderKeys',
          this.cryptoSrvc.encrypt(JSON.stringify(this.orderKeys))
        );
        localStorage.setItem(
          'order',
          this.cryptoSrvc.encrypt(JSON.stringify(this.processedOrder))
        );

        this.dialog.closeAll();
        this.amountDue =
          parseFloat(this.product.price) *
          parseFloat(this.term) *
          this.order.item.quantity;
        setTimeout(() => {
          payFast.click();
        }, 200);
      })
      .catch((error) => {
        //////console.log(error);
        this.dialog.closeAll();

        this.alert('Something went wrong, please try again later');
      });
  }
  splasher() {
    this.splash = false;
  }
  parseFloat(val) {
    return parseFloat(val);
  }

  scroll(el: HTMLElement) {
    window.scrollTo({
      top: el.offsetTop - 80,
      behavior: 'smooth',
    });
  }
  // getLocation(): void{
  //   if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition((position)=>{
  //         const longitude = position.coords.longitude;
  //         const latitude = position.coords.latitude;
  //         this.callApi(longitude, latitude);
  //       });
  //   } else {
  //      console.log("No support for geolocation")
  //   }
  // }

  // callApi(Longitude: number, Latitude: number){
  //   const url = `https://api-adresse.data.gouv.fr/reverse/?lon=${Longitude}&lat=${Latitude}`
  //   //Call API
  // }
  getLocation() {
    const successCallback = (position) => {
      console.log(position);
    };

    const errorCallback = (error) => {
      console.log(error);
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }


  report() {
    return this.router.navigate(['create-product/']);
  }
}
