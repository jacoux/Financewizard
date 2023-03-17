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
import { CreateInvoiceComponent } from './components/invoices/create-invoice-pdf/create-invoice.component';
import { ClientComponent } from './components/client/client.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from './components/products/products.component';
import { CreateClientComponent } from './components/client/create-client/create-client.component';
import { AllClientsComponent } from './components/client/all-clients/all-clients.component';
import { EditClientComponent } from './components/client/edit-client/edit-client.component';
import { NewInvoiceComponent } from './components/invoices/new-invoice/new-invoice.component';
import { AllInvoicesComponent } from './components/invoices/all-invoices/all-invoices.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrganizationComponent } from './components/organization/organization.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { WelcomeMessageComponent } from './components/shared/welcome-message/welcome-message.component';
import { MY_DATE_FORMATS } from './shared/dateadapter';
import { TableComponent } from './components/shared/table/table.component';




@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    HeaderComponent,
    SidebarComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    CreateInvoiceComponent,
    ClientComponent,
    ProductsComponent,
    CreateClientComponent,
    AllClientsComponent,
    EditClientComponent,
    NewInvoiceComponent,
    AllInvoicesComponent,
    OrganizationComponent,
    SidebarComponent,
    WelcomeMessageComponent,
    TableComponent
  ],
  imports: [
    MatDatepickerModule,
    HttpClientModule,
    MatNativeDateModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    BrowserAnimationsModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
