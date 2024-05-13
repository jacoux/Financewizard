import { Injectable, NgZone } from '@angular/core';
import { User } from '../types/user';
import * as auth from 'firebase/auth';

import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, lastValueFrom, throwError } from 'rxjs';
import { error } from 'console';
import PocketBase, { RecordAuthResponse } from 'pocketbase';

import { response } from 'express';
import { setOrganizationData } from 'src/app/store/organization/organization.actions';
import { GeneralCrudService } from './general-crud.service';
import { State } from 'src/app/store/users/users.reducer';
import { setUser } from 'src/app/store/users/users.actions';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  pb = new PocketBase(environment.apiUrl);

  constructor(
    private http: HttpClient,
    public router: Router,
    private store: Store<State>,
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
  async SignIn(email: string, password: string) {
    const authData = this.pb
      .collection('users')
      .authWithPassword(email, password);
    debugger;
    if (await authData) {
      this.GetUser(authData);
      if (this.userData) {
        this.store.dispatch(setUser({ data: this.userData }));
        this.SetUserData(this.userData);
      } else {
        alert('helaas heb je geen account of is je wachtwoord fout');
      }

      return this.router.navigate(['dashboard']);
    }

    return;
  }

  // Sign up with email/password
  async SignUp(
    username: string,
    email: string,
    password: string,
    laterFillInCompanyDetails: boolean
  ) {
    const data = {
      username: username,
      email: email,
      emailVisibility: true,
      password: password,
      passwordConfirm: password,
      name: email,
      verified: false,
      linkedCompany: [null],
      role: [null],
    };
    debugger;
    const record = await this.pb.collection('users').create(data);

    // (optional) send an email verification request
    if (record.id) {
      // avatar: '';
      // collectionId: '_pb_users_auth_';
      // collectionName: 'users';
      // created: '2024-04-20 12:16:26.135Z';
      // email: 'test@mail.be';
      // emailVisibility: true;
      // id: 'fss6dgup50ims0f';
      // linkedCompany: [];
      // name: 'test@mail.be';
      // role: ['piy39lmtx9o94re'];
      // updated: '2024-04-20 12:16:26.135Z';
      // username: 'test';
      // verified: false;

      this.store.dispatch(setUser({ data: record }));
      if (laterFillInCompanyDetails) {
        this.SendVerificationMail(email);
      } else {
        this.router.navigate(['onboarding']);
      }
    } else {
      alert('something went wrong');
    }

    // return this.pb
    //   .collection('users')
    //   .create({ email: email, password: password })
    //   .then((result) => {
    /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
    // this.SetUserData(result['user']);

    // })
    // .catch((error) => {
    //   window.alert(error.message);
    // });
  }
  // Send email verfificaiton when new user sign up
  SendVerificationMail(user: string) {
    this.pb.collection('users').requestVerification(user);
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
    const userData: User = {
      uid: user.id,
      email: user.email,
      displayName: user.username,
      photoURL: user.avatar,
      emailVerified: user.verified,
      companyId: user?.linkedCompany?.[0],
    };
    localStorage.setItem('user', JSON.stringify(userData));
  }

  UpdateUser(id: any) {
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user) {
      localStorage.setItem('user', JSON.stringify(this.userData));
      return this.router.navigate(['/dashboard']);
    } else {
      alert('geen gebruiker gevonden');
      return;
    }
  }

  GetUser(user: any) {
    // after the above you can also access the auth data from the authStore
    console.log(this.pb.authStore.token);

    // "logout" the last authenticated account
    // this.pb.authStore.clear();
    // /api/collections/ users / records;

    if (this.pb.authStore?.model?.['id']) {
      const newU: any = this.pb.authStore?.model;
      debugger;
      this.userData = newU;
      this.userData.companyId = newU.linkedCompany[0];
      this.userData.token = this.pb.authStore.token;
      localStorage.setItem('token', this.pb.authStore.token);
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
    return;
  }
}
