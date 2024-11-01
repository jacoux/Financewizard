import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';

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
import { InputComponent } from './components/shared/input/input.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';


// export function localStorageSyncReducer(
//   reducer: ActionReducer<any>
// ): ActionReducer<any> {
//   return localStorageSync({
//     keys: ['invoiceDraft', 'organization'],
//     rehydrate: true,
//   })(reducer);
// }

export function localStorageSyncReducer(rootReducer: any) {
  return localStorageSync({
    keys: ['invoiceDraft', 'organization'],
    rehydrate: true,
  })(rootReducer);
}
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    OnboardingComponent,
    InputComponent,
  ],
  imports: [
    TranslateModule.forRoot({
            defaultLanguage: 'en',
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
    MatDatepickerModule,
    HttpClientModule,
    MatNativeDateModule,
    BrowserModule,
    AppRoutingModule,
    DashboardRoutingModule,
    FormsModule,
    MatSortModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    DashboardModule,
    DashboardRoutingModule,
    SharedModule,
    //  StoreModule.forRoot(reducers, {
    //   metaReducers: [..., localStorageSyncReducer],
    // }),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([
      UsersEffects,
      InvoiceDraftEffects,
      organizationEffects,
    ]),
  ],
  exports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'nl-BE',
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
