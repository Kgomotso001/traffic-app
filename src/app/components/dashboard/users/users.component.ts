import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users/users.service';
import { UsersDialogComponent } from '../../../modals/users-dialog/users-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface Users {
  firstName: string;
  lastName: string;
  emailAddress: string;
  createdAt: number;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = [ 'firstName', 'lastName', 'emailAddress', 'createdAt', 'action'];
  users: Users;
  dataSource;
  loading;

  constructor(
    private usersService: UsersService,
    private dialog: MatDialog,
  ) {

  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.loading = true;
    this.usersService.getUsers().then(
      resp => {
        this.users = resp.users;
        console.log(this.users);
        this.dataSource = this.users;
        this.loading = false;
      }
    ).catch(
      error => {
        this.loading = false;
      }
    )
  }

  deleteUser(user){
    this.loading = true;
    let userId = user.userId;
    this.usersService.deleteUser(userId).then(
      resp => {
        // console.log(resp);
        this.loading = false;
      }
    )
    .catch(
      error => {
        console.log(error);
      }
    )
  }

  createUser(){
    this.dialog.open(UsersDialogComponent,
        {width: '250px'}
      );
  }
}
