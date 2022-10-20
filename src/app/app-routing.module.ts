import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LandingComponent } from './components/landing/landing.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { EditProductComponent } from "./components/edit-product/edit-product.component";
import { CreateProductComponent } from './components/create-product/create-product.component';


const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'payment/:id', component: LandingComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'edit-product', component: EditProductComponent
  },
  {
    path: 'create-product', component: CreateProductComponent
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' },



];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
