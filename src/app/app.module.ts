import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './modals/login/login.component';
import { PaymentComponent } from './modals/payment/payment.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBottomSheetModule, MAT_BOTTOM_SHEET_DEFAULT_OPTIONS } from '@angular/material/bottom-sheet';
import { AccountComponent } from './modals/account/account.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
// import * as firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { environment } from 'src/environments/environment';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OrderComponent } from './modals/order/order.component';
import { LoadingComponent } from './modals/loading/loading.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSortModule } from '@angular/material/sort';
import { PlatformModule } from '@angular/cdk/platform';
import { LayoutModule } from '@angular/cdk/layout';
import { OrdersComponent } from './components/dashboard/orders/orders.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { HeatmapComponent } from './components/landing/heatmap/heatmap.component';
import { UsersComponent } from './components/dashboard/users/users.component';
import { ReportsComponent } from './components/dashboard/reports/reports.component';
import { UsersDialogComponent } from './modals/users-dialog/users-dialog.component';
// import {Loader} from "@googlemaps/js-api-loader";
// import {Loader} from 'google-maps/lib/types/loader';

firebase.initializeApp(environment.firebaseConfig);
@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LoginComponent,
    PaymentComponent,
    AccountComponent,
    DashboardComponent,
    OrderComponent,
    LoadingComponent,
    WrapperComponent,
    NotFoundComponent,
    OrdersComponent,
    EditProductComponent,
    CreateProductComponent,
    HeatmapComponent,
    UsersComponent,
    ReportsComponent,
    UsersDialogComponent
  ],
  entryComponents: [
    LoginComponent,
    PaymentComponent,
    AccountComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSidenavModule,
    MatDialogModule,
    MatSnackBarModule,
    MatBottomSheetModule,
    ClipboardModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatMenuModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatProgressBarModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatSortModule,
    PlatformModule,
    LayoutModule,
    // Loader
  ],
  providers: [
    { provide: MAT_BOTTOM_SHEET_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
