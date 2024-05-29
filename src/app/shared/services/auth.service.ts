import { Injectable, NgZone } from '@angular/core';
import { User } from '../types/user';
import * as auth from 'firebase/auth';

import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, lastValueFrom, throwError } from 'rxjs';
import { error } from 'console';
import PocketBase, { RecordAuthResponse } from 'pocketbase';
import { response } from 'express';
import { setOrganizationData } from 'src/app/store/organization/organization.actions';
import { GeneralCrudService } from './general-crud.service';
import { State } from 'src/app/store/users/users.reducer';
import { setUser } from 'src/app/store/users/users.actions';
import { environment } from 'src/environments/environment';
import { NotificationService } from '../component/notification.service';
import { NotificationType } from '../types/notofication';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  pb = new PocketBase(environment.apiUrl);
  auth_token = localStorage.getItem('token');

  constructor(
    private http: HttpClient,
    public router: Router,
    private store: Store<State>,
    private notificationService: NotificationService,
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
      .authWithPassword(email, password)
      .then((authData) => {
        if (authData) {
          this.store.dispatch(setUser({ data: authData.record }));
          this.SetUserData(authData.record);
          this.router.navigate(['dashboard']);

        } else {
          alert('helaas heb je geen account of is je wachtwoord fout');
        }
      })
      .catch((error) => {
        if (error) {
          alert('Inlog is onjuist')
             this.notificationService.notify({
               title: 'Oh Oh 😕',
               type: NotificationType.danger,
               message: 'Geen gebruiker gevonden',
             });
        }
      });

  }

  // Sign up with email/password
  async SignUp(username: string, email: string, password: string) {
    const data = {
      username: username,
      email: email,
      emailVisibility: true,
      password: password,
      passwordConfirm: password,
      name: email,
      verified: true,
      customVerified: false,
      linkedCompany: [null],
      role: [null],
    };
    const record = await this.pb.collection('users').create(data);
    if (record.id) {
      this.SetUserData(record);
      return this.SendVerificationMail(data.email, record.id);

      // this.store.dispatch(setUser({ data: record }));
      //   this.router.navigate(['onboarding']);
    } else {
      alert('something went wrong');
    }
    return;
  }
  // Send email verfificaiton when new user sign up
  SendVerificationMail(user: any, id: string) {
    console.log(user);
    alert('verificatiemail komt eraan!');
    const apiUrl = 'https://api.mailersend.com/v1/email';
    const yourToken =
      'mlsn.cf58e08028639d59fb5a51c4db77f1b9117054a2c9094cf649ace04ac2aff9e5'; // Replace with your actual MailerSend token

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${yourToken}`,
      }),
    };
    const body = {
      from: {
        email: 'info@financewizard.be',
      },
      to: [
        {
          email: user.email,
        },
      ],
      template_id: '351ndgwwmdqgzqx8',
      personalization: [
        {
          email: user.email,
          data: {
            id: id,
          },
        },
      ],
    };
    
    return this.http.post(apiUrl, body, httpOptions).subscribe((response) => {
      if (response) {
        console.log(response);
      }
    });
  }
  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {}

  async authRefresh() {
    const authData = await this.pb
      .collection('users')
      .authRefresh()
      .then((response) => {
        if (response.record) {
          this.SetUserData(response.record);
          localStorage.setItem('token', this.pb.authStore.token);
          return response.meta;
        } else {
          return null;
        }
      })
      .catch((error) => {
        return null;
      });
    return;
  }
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    // @ts-expect-error
    const localUser = JSON.parse(localStorage.getItem('user')) as User;

    if (localUser) {
      const user = this.authRefresh();
      return user !== null ? true : false;
    } else {
      return false;
    }
  }

  SetUserData(user: any) {
    const userData: User = {
      id: user.id,
      email: user.email,
      username: user.username,
      photoURL: user.avatar,
      verified: user.verified,
      customVerified: user.customVerified,
      linkedCompany: user?.linkedCompany?.[0],
    };
    localStorage.setItem('user', JSON.stringify(userData));
  }

  UpdateUser(id: any) {
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user) {
      localStorage.setItem('user', JSON.stringify(this.userData));
      return this.router.navigate(['/dashboard']);
    } else {
      this.notificationService.notify({
        title: 'Oh Oh 😕',
        type: NotificationType.danger,
        message: "Geen gebruiker gevonden",
      });
      return;
    }
  }

  async UpdateUserAfterVerification(id: string) {
    if (this.auth_token === null) {
      this.authRefresh();
    }
    const record = await this.pb
      .collection('users')
      .update(id, { customVerified: true }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.auth_token}`,
        },
      })
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response));
        return this.router.navigate(['/dashboard']);
      })
      .catch(() => {
        alert('Er ging iets mis met het verifieren van je account');
      });
  }

  // company is made, now set the id of the created company to the user
  async UpdateUserAfterAssignedToOrganisation(companyId: any) {
    // if (user) {
    //   return this.router.navigate(['/dashboard']);
    // } else {
    //   alert('Geen gebruiker gevonden');
    //   return;
    // }

    const user = JSON.parse(localStorage.getItem('user')!);
    const userData: User = {
      id: user.id,
      email: user.email,
      username: user.username,
      photoURL: user.avatar,
      verified: user.verified,
      customVerified: user.customVerified,
      linkedCompany: [companyId],
    };

    const record = await this.pb
      .collection('users')
      .update(userData.id, userData);
    
    if (record) {
      localStorage.setItem('user', JSON.stringify(userData));
      return this.router.navigate(['/dashboard']);
    } else {
      alert('Geen gebruiker gevonden');
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
      
      this.userData = newU;
      this.userData.linkedCompany[0] = newU.linkedCompany?.[0];
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
    this.router.navigate(['/sign-in']);
    return;
  }
}
