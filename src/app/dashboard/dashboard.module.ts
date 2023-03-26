import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Template1Component } from './components/invoices/templates/template1/template1.component';
import { Template2Component } from './components/invoices/templates/template2/template2.component';
import { Template3Component } from './components/invoices/templates/template3/template3.component';
import { ReadyComponent } from './components/invoices/ready/ready.component';
import { InvoiceCheckComponent } from './components/invoices/invoice-check/invoice-check.component';
import { OrganizationComponent } from './components/organization/organization.component';
import { ProductsComponent } from './components/products/products.component';
import { CreateClientComponent } from './components/client/create-client/create-client.component';
import { AllClientsComponent } from './components/client/all-clients/all-clients.component';
import { EditClientComponent } from './components/client/edit-client/edit-client.component';
import { NewInvoiceComponent } from './components/invoices/new-invoice/new-invoice.component';
import { AllInvoicesComponent } from './components/invoices/all-invoices/all-invoices.component';
import { ClientComponent } from './components/client/client.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from '../components/shared/table/table.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { SidebarComponent } from '../components/shared/sidebar/sidebar.component';
import { HeaderComponent } from '../components/shared/header/header.component';
import { WelcomeMessageComponent } from '../components/shared/welcome-message/welcome-message.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [
    WelcomeMessageComponent,
    SidebarComponent,
    HeaderComponent,
    ClientComponent,
    ProductsComponent,
    CreateClientComponent,
    AllClientsComponent,
    EditClientComponent,
    NewInvoiceComponent,
    AllInvoicesComponent,
    OrganizationComponent,
    InvoiceCheckComponent,
    Template1Component,
    Template2Component,
    Template3Component,
    ReadyComponent,
    TableComponent,
    MainDashboardComponent
  ],
  imports: [
    CommonModule,
        DashboardRoutingModule,
     FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
  ]
})
export class DashboardModule { }
