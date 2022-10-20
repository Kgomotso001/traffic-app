import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {


  user;
  constructor(
    private _snackBar: MatSnackBar,
    private userSrvc : UsersService,
    private authSrvc : AuthService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.userSrvc.getActiveUser().subscribe(
      resp =>{this.user = resp}
    )
  }
  alert(msg){
    this._snackBar.open(msg, "", {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['custom-snackbar']
    });
  }
  signOut(){
    this.authSrvc.signout().then(
      resp =>{
        this.userSrvc.setActiveUser(null);
        this.alert("Sign out successfully");
        this.router.navigate(['/'])
      }
    )
  }

  

}
