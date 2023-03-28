import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './components/client/client.component';
import { ProductsComponent } from './components/products/products.component';
import { CreateClientComponent } from './components/client/create-client/create-client.component';
import { AllClientsComponent } from './components/client/all-clients/all-clients.component';
import { EditClientComponent } from './components/client/edit-client/edit-client.component';
import { AllInvoicesComponent } from './components/invoices/all-invoices/all-invoices.component';
import { NewInvoiceComponent } from './components/invoices/new-invoice/new-invoice.component';
import { OrganizationComponent } from './components/organization/organization.component';
import { InvoiceCheckComponent } from './components/invoices/invoice-check/invoice-check.component';
import { ReadyComponent } from './components/invoices/ready/ready.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { AuthGuard } from '../shared/guard/auth.guard';
const dashboardRoutes: Routes = [
    {
    path: 'dashboard', component: MainDashboardComponent, canActivate:[AuthGuard],
    children: [
  { path: 'invoices',
    children: [
      {
        path: 'create',
        component: NewInvoiceComponent
      },
      {
        path: 'check',
        component: InvoiceCheckComponent
      },
     {
        path: 'ready',
        component: ReadyComponent
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
  {
    path: 'account', component: OrganizationComponent
  },
       ]
  },
];
@NgModule({
  declarations: [],
  imports: [
      CommonModule,
      RouterModule.forChild(dashboardRoutes),
    ],
    exports: [RouterModule],
})
export class DashboardRoutingModule { }
