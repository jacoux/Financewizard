import { Injectable, NgZone } from '@angular/core';
import { User } from '../types/user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, lastValueFrom, throwError } from 'rxjs';
import { error } from 'console';
import PocketBase from 'pocketbase';

import { response } from 'express';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  pb = new PocketBase('http://127.0.0.1:8090');

  constructor(
    private http: HttpClient,
    public afs: AngularFirestore, // Inject Firestore service
    public router: Router,
    public store: Store,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */

  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Observable((observer) => observer.next(new Error()))
    );
  }
  // Sign in with email/password
  SignIn(email: string, password: string) {
    const authData = this.pb
      .collection('users')
      .authWithPassword(email, password);
    
    if (authData) {
      this.GetUser(authData);
      if (this.userData) {
        this.SetUserData(this.userData);
      }
      return this.router.navigate(['dashboard']);

    }
    return;
  }

  // Sign up with email/password
  SignUp(email: string, password: string, laterFillInCompanyDetails: boolean) {
    return this.pb
      .collection('user')
      .create({email: email, password: password, laterFillInCompanyDetails})
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SetUserData(result['user']);
        if (laterFillInCompanyDetails) {
          this.SendVerificationMail();
        } else {
          this.router.navigate(['onboarding']);
        }
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    // return this.afAuth.currentUser
    //   .then((u: any) => u.sendEmailVerification())
    //   .then(() => {
    //     this.router.navigate(['verify-email-address']);
    //   });
  }
  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    // return this.afAuth
    //   .sendPasswordResetEmail(passwordResetEmail)
    //   .then(() => {
    //     window.alert('Password reset email sent, check your inbox.');
    //   })
    //   .catch((error) => {
    //     window.alert(error);
    //   });
  }
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null ? true : false;
  }
  // Sign in with Google
  GoogleAuth() {
    // return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      this.router.navigate(['dashboard']);
    // });
  }
  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    // return this.afAuth
    //   .signInWithPopup(provider)
    //   .then((result) => {
    //     debugger;
    //     this.GetUser(result.user);
    //     return this.router.navigate(['dashboard']);
    //   })
    //   .catch((error) => {
    //     window.alert(error);
    //   });
  }
  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    debugger;
    const userData: User = {
      uid: user.id,
      email: user.email,
      displayName: user.username,
      photoURL: user.avatar,
      emailVerified: user.verified,
      companyId: user?.companyId,
    };
 localStorage.setItem('user', JSON.stringify(userData));

  }

  UpdateUser(id: any) {
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user) {
      const userRef = this.afs.doc(`users/${user.uid}`);
      userRef.update({ companyId: id });
      this.userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        companyId: id,
      };
      localStorage.setItem('user', JSON.stringify(this.userData));
      return this.router.navigate(['/dashboard']);
    } else {
      alert('geen gebruiker gevonden');
      return;
    }
  }

  GetUser(user: any) {
    // after the above you can also access the auth data from the authStore
    // console.log(this.pb.authStore.token);

    // "logout" the last authenticated account
    // this.pb.authStore.clear();
    // /api/collections/ users / records;
    debugger;
      if (this.pb.authStore?.model?.['id']) {
        const newU: any = this.pb.authStore?.model
        debugger;
        this.userData = newU;
          this.userData.companyId = newU.linkedCompany[0];
                // console.log(this.userData.companyId);
              } else {
                console.log('There is no document!');
              }
  }

  // Sign out
  SignOut() {
     this.pb.authStore.clear();
          localStorage.removeItem('user');
    this.router.navigate(['sign-in']);
    return;;
  }
}
