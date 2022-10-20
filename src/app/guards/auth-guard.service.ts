import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private _authService: AuthService, private _router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //console.log("Guarding");
    
    return this._authService.authState().then(
      resp => {
        return true;

      }
    ).catch(error => {
      //console.log(error);
      this._router.navigate(['/']);
      return false;
    });
  }
}
