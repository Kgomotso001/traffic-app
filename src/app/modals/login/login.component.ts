import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login = true;
  signUpForm: FormGroup;
  signInForm: FormGroup;
  resetPasswordForm: FormGroup;
  loading = false;
  user;

  constructor(
    private formBldr: FormBuilder,
    private authSrvc: AuthService,
    private userSrvc: UsersService,
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
    private router: Router
  ) {

    let reg = data;

    if (reg['type'] === "register") {
      this.login = false
    }
  }

  ngOnInit(): void {
    this.signInForm = this.formBldr.group({

      emailAddress: [
        '', [
          Validators.required,
          Validators.email,
        ]
      ],
      password: [
        '', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30),
        ]
      ],

    });
    this.resetPasswordForm = this.formBldr.group({

      emailAddress: [
        '', [
          Validators.required,
          Validators.email,
        ]
      ]
    });

    this.signUpForm = this.formBldr.group({

      firstName: [
        null, [
          Validators.required,
          Validators.pattern(/^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$/)
        ]
      ],
      lastName: [
        null, [
          Validators.required,
          Validators.pattern(/^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$/)
        ]
      ],
      emailAddress: [
        null, [
          Validators.required,
          Validators.email,
        ]
      ],
      password: [
        null, [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30),
        ]
      ],


    });
  }

  errorMessage(ctrl, formRef): string {
    const form: FormControl = (formRef.get(ctrl) as FormControl);
    return form.hasError('required') ?
      'is required' :
      form.hasError('maxlength') ?
        'is too long' :
        form.hasError('minlength') ?
          'is too short' :
          form.hasError('pattern') ? 'can not contain special characters or numbers' : form.hasError('email') ? 'is invalid' : '';
  }

  userSignUp(formDirective) {
    if (this.signUpForm.status == "INVALID") {
      //console.log('dzaddy chill');
      return
    }

    this.loading = true;

    let user = {
      emailAddress: this.signUpForm.get('emailAddress').value.toLowerCase(),
      firstName: this.signUpForm.get('firstName').value,
      lastName: this.signUpForm.get('lastName').value,
      role: "CUSTOMER",
      consent: {
        type: "TERMS-OF-USE",
        consent: true
      }
    };

    let password = this.signUpForm.get('password').value;

    this.authSrvc.createUser(user.emailAddress, password).then(
      resp => {
        //console.log(resp);
        this.saveUserToBb(user)
        this.signUpForm.reset();
        formDirective.resetForm();
        this.loading = false;
      }
    ).catch(
      error => {
        //console.log(error);
        this.formAlert(this.authValidator(error))
        this.signUpForm.reset();
        formDirective.resetForm();
        this.loading = false;
      }
    )

  }


  error = {
    message: null,
    state: false
  };

  timeOut;
  reset = false;
  formAlert(message) {
    this.error.message = message;
    this.error.state = true;
    this.timeOut = setTimeout(() => {
      this.error.state = false;
      clearTimeout(this.timeOut);
    }, 6000);

  }

  toggle() {
    this.error.state = false;
    this.resp.state = false;
    clearTimeout(this.timeOut);
    //this.mode = !this.mode
  }

  userSignIn(formDirective) {
    if (this.signInForm.status == "INVALID") {
      //console.log('dzaddy chill');

      return
    }

    this.loading = true;
    let user = {
      emailAddress: this.signInForm.get('emailAddress').value.toLowerCase(),
      password: this.signInForm.get('password').value,
    }
    this.authSrvc.signInWithEmailAndPassword(user.emailAddress, user.password).then(
      resp => {
        //  //console.log(resp);
        this.fetchUser(user.emailAddress);
      }
    ).catch(
      error => {
        //console.log(error);
        this.formAlert(this.authValidator(error))
        this.signInForm.reset();
        formDirective.resetForm();

      }
    );
  }

  resp = {
    message: '',
    state: false
  };


  resetPassword(formDirective) {
    if (this.resetPasswordForm.status == "INVALID") {
      //console.log('dzaddy chill');

      return
    }

    this.loading = true;
    let
      emailAddress = this.signInForm.get('emailAddress').value.toLowerCase().trim()

    this.authSrvc.resetPassword(emailAddress).then(
      resp => {
        //  //console.log(resp);
        this.resp.message = "A link to reset your password has been sent to " + emailAddress;
        this.resp.state = true;
      }
    ).catch(
      error => {
        //console.log(error);
        this.formAlert(this.authValidator(error))
        this.signInForm.reset();
        formDirective.resetForm();

      }
    );
  }

  saveUserToBb(user) {
    this.userSrvc.createUser(user).then(
      resp => {
        //console.log(resp);
        this.userSrvc.setActiveUser(resp);
        this.user = resp;
        this.signUpForm.reset();
        this.dialogRef.close();
      }
    ).catch(
      error => {
        //console.log(error);

      }
    )
  }

  fetchUser(emailAddress) {
    this.userSrvc.getUserByEmail(emailAddress).then(
      resp => {
        ////console.log(resp);
        this.loading = true;
        this.userSrvc.setActiveUser(resp.users[0]);
        this.user = resp.users[0];
        this.signInForm.reset();
        this.dialogRef.close();

        if (this.user.role === "ADMIN") {
          this.router.navigate(['/dashboard'])
        }

      }
    ).catch(
      error => {
        //console.log(error);

      }
    )
  }

  authValidator(error) {
    switch (error['code']) {
      case "auth/wrong-password":
        return "Invalid email address or password.";
        break;
      case "auth/invalid-email":
        return "Please enter a valid email address.";
        break;
      case "auth/user-not-found":
        return "Please create an account first.";
        break;
      case "auth/weak-password":
        return "Password should be at least 6 characters.";
        break;
      case "auth/email-already-in-use":
        return "The email address is already in use by another account.";
        break;
      case "auth/uid-already-exists":
        return "The email address is already in use by another account.";
        break;
      case "auth/network-request-failed":
        return "Please make sure you are connected to the internet";
        break;
      case "auth/argument-error":
        return "Please fill your creditials";
        break;
      default:
        return "Something went wrong, please try again later";

    }
  }

}
