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
import { response } from 'express';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  constructor(
    private http: HttpClient,
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public store: Store,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */

    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        this.GetUser(user);
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
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
    return this.http.post(
      'http://127.0.0.1:8090/api/collections/users/auth-with-password',
      { identity: email, password: password },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  // Sign up with email/password
  SignUp(email: string, password: string, laterFillInCompanyDetails: boolean) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SetUserData(result.user);
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
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }
  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null ? true : false;
  }
  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      this.router.navigate(['dashboard']);
    });
  }
  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.GetUser(result.user);
        return this.router.navigate(['dashboard']);
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      companyId: user?.companyId,
    };
    return userRef.set(userData, {
      merge: true,
    });
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
    this.afs
      .collection('users')
      .doc(user.uid)
      .ref.get()
      .then((doc) => {
        if (doc.exists) {
          const newU: any = doc.data();
          this.userData.companyId = newU.companyId;
          console.log(newU.companyId);
        } else {
          console.log('There is no document!');
        }
      })
      .catch(function (error) {
        console.log('There was an error getting your document:', error);
      });
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }
}
