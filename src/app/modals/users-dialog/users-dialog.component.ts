import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService} from '../../services/users/users.service';

@Component({
  selector: 'app-users-dialog',
  templateUrl: './users-dialog.component.html',
  styleUrls: ['./users-dialog.component.scss']
})
export class UsersDialogComponent implements OnInit {

  userDetailsForm: FormGroup;
  // firstName: string;
  // lastName: string;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
  ) { }

  ngOnInit(): void {

    this.userDetailsForm = this.formBuilder.group({
      firstName: [null,
        [
          Validators.required
        ]
      ],
      lastName: [
        null,
        [
          Validators.required,
        ]
      ],
      emailAddress: [
        null,
        [
          Validators.required,
          Validators.email
        ]
      ],

    })
  }

  createUser(){

    let user = {
      firstName: this.userDetailsForm.value.firstName,
      lastName: this.userDetailsForm.value.lastName,
      emailAddress: this.userDetailsForm.value.emailAddress,
      role: "CUSTOMER",
      consent: null,

    }

    console.log(user);

    this.usersService.createUser(user).then(
      resp => {

      }
    ).catch(
      error => {
        console.log(error);
      }
    )
  }
}
