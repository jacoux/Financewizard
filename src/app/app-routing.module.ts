import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { CommonModule } from '@angular/common';
import { CreateInvoiceComponent } from './components/invoices/create-invoice-pdf/create-invoice.component';
import { ClientComponent } from './components/client/client.component';
import { ProductsComponent } from './components/products/products.component';
import { CreateClientComponent } from './components/client/create-client/create-client.component';
import { AllClientsComponent } from './components/client/all-clients/all-clients.component';
import { EditClientComponent } from './components/client/edit-client/edit-client.component';
import { AllInvoicesComponent } from './components/invoices/all-invoices/all-invoices.component';
import { NewInvoiceComponent } from './components/invoices/new-invoice/new-invoice.component';
import { OrganizationComponent } from './components/organization/organization.component';
import { InvoiceCheckComponent } from './components/invoices/invoice-check/invoice-check.component';
const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'invoices', component: AllInvoicesComponent,
    children: [
      {
        path: 'overview',
        component: NewInvoiceComponent
      },
      {
        path: 'create',
        component: NewInvoiceComponent
      },
      {
        path: 'check',
        component: InvoiceCheckComponent
      },

    ]

  },
  { path: 'clients', component: ClientComponent,
    children: [
      {
        path: 'overview',
        component: AllClientsComponent,
      },
      {
        path: 'create',
        component: CreateClientComponent,
      },
      {
          path: ':id',
          component: EditClientComponent,
      },
] },
  { path: 'products', component: ProductsComponent },
  { path: 'account', component: OrganizationComponent },
];
@NgModule({
  declarations: [],
    imports: [
      RouterModule.forRoot(routes),
      CommonModule
    ],
    exports: [RouterModule],
})
export class AppRoutingModule { }
