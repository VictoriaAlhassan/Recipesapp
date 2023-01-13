import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user;
  errorMessage;
  loading: boolean = false;
  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router
  ) {
    this.angularFireAuth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        this.user = null;
        localStorage.removeItem('user');
      }
    });
  }
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user != null;
  }
  login(email: string, password: string) {
    this.loading = true;
    this.errorMessage = null;
    return this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then(
        (loggedInUser) => {
          // this.angularFireAuth.auth

          console.log(loggedInUser);
          this.angularFireAuth.authState.subscribe((user) => {
            if (user) {
              localStorage.setItem('user', JSON.stringify(user));
              //  localStorage.setItem('token', user.multiFactor.user.accessToken )
              this.router.navigate(['/recipes']);
            }
          });
          this.loading = false;
        },
        (error) => {
          console.log(error);

          this.errorMessage = this.formatErrorMessage(error);

          this.loading = false;
        }
      );
  }
  formatErrorMessage(error) {
    const message = error?.message.split(':').pop().split('(')[0];

    return message;
  }
  logOut() {
    this.angularFireAuth.signOut().then(() => {
      localStorage.clear();
      this.user = null;
      this.router.navigate(['/auth']);
    });
  }

  signUp(email: string, password: string) {
    this.errorMessage = null;
    this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['/recipes']);
        }
      })
      .catch((error) => {
        this.errorMessage = this.formatErrorMessage(error);
      });
  }
}
