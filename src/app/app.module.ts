import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatNativeDateModule,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MY_DATE_FORMATS } from './shared/dateadapter';
import { ActionReducer, MetaReducer, State, StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';
import { localStorageSync } from 'ngrx-store-localstorage';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './store/users/users.effects';
import { InvoiceDraftEffects } from './store/invoiceDraft/invoiceDraft.effects';
import { OnboardingComponent } from './components/onboarding/onboarding.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard/dashboard-routing.module';
import { organizationState } from './store/organization/organization.models';
import { organizationEffects } from './store/organization/organization.effects';
import { MatFormFieldModule } from '@angular/material/form-field';

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({
    keys: ['organization', 'invoiceDraft'],
    rehydrate: true,
  })(reducer);
}

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    OnboardingComponent,
  ],
  imports: [
    MatDatepickerModule,
    HttpClientModule,
    MatNativeDateModule,
    BrowserModule,
    AppRoutingModule,
    DashboardRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    DashboardRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([
      UsersEffects,
      InvoiceDraftEffects,
      organizationEffects,
    ]),
  ],
  exports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
