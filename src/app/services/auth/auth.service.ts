import { Injectable } from '@angular/core';
import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import { UsersService } from '../users/users.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(
    private userSrvc : UsersService
  ) {

  }

  authState() {

    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          let email = user['email']

          this.userSrvc.getUserByEmail(email).then(
            resp =>{
              if (resp.users.length > 0) {
                this.userSrvc.setActiveUser(resp.users[0])
                resolve(email);
              } else {
                reject(null);
              }
            }
          )


        } else {
          reject(null);
        }
      });
    })
  }

  signInWithEmailAndPassword(email, password) {

    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password).then(
        resp => {
          resolve(resp);
        }
      ).catch(error => {

        reject(error);

      });
    });


  }

  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  resetPassword(emailAddress) {

    return new Promise((resolve, reject) => {
      firebase.auth().sendPasswordResetEmail(emailAddress).then(function () {
        resolve(true)
      }).catch(function (error) {
        reject(false)
      });
    });

  }

  sendEmailVerification() {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(user => {
        user.sendEmailVerification().then(
          resp => {
            resolve(true)
          }
        ).catch(
          error => {
            reject(false)
          }
        )
      })
    });

  }

  createUser(email, password) {


    let user = {
      uid: email,
      email: email,
      password: password
    }



    //console.log(user);
    

    return new Promise((resolve, reject) => {

      firebase.auth().createUserWithEmailAndPassword(email, password).then(
        resp => {
          resolve(resp);
        }
      ).catch(error => {

        reject(error);

      });
      // let createUser = firebase.functions().httpsCallable('createUser');
      // createUser(user).then(result => {

      //   ////console.log(this.isEmpty(result.data.code));

      //   if (typeof result.data.code !== "undefined") {
      //     reject(result.data);
      //   } else {
      //     resolve({ user: result.data })
      //   }
      // }, error => {
      //   ////console.log(error);
      //   reject(error);
      // }).catch(error => {
      //   ////console.log(error);
      //   reject(error)

      //});

    });

  }


  signout() {

    return new Promise((resolve, reject) => {
      firebase.auth().signOut().then(resp => {

        resolve(resp);
      }).catch(error => {
        reject(error)
      });
    });

  }


}
