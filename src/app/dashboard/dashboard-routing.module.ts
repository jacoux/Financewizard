import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './components/client/client.component';
import { ProductsComponent } from './components/products/products.component';
import { CreateClientComponent } from './components/client/create-client/create-client.component';
import { AllClientsComponent } from './components/client/all-clients/all-clients.component';
import { AllInvoicesComponent } from './components/invoices/all-invoices/all-invoices.component';
import { NewInvoiceComponent } from './components/invoices/new-invoice/new-invoice.component';
import { OrganizationComponent } from './components/organization/organization.component';
import { InvoiceCheckComponent } from './components/invoices/invoice-check/invoice-check.component';
import { ReadyComponent } from './components/invoices/ready/ready.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { AuthGuard } from '../shared/guard/auth.guard';
import { ChatComponent } from './components/chat/chat.component';
import { RecruitmentComponent } from './components/recruitment/recruitment.component';
import { CreateJobComponent } from './components/recruitment/create-job/create-job.component';
import { ApplicantFormComponent } from './components/recruitment/create-job/applicant-form/applicant-form.component';
import { ApplicantProcessComponent } from './components/recruitment/create-job/applicant-process/applicant-process.component';
import { JobDescriptionComponent } from './components/recruitment/create-job/job-description/job-description.component';
import { JobApplicantsComponent } from './components/recruitment/job-applicants/job-applicants.component';
import { ApplicantDetailComponent } from './components/recruitment/job-applicants/applicant-detail/applicant-detail.component';
import { JobDetailComponent } from './components/recruitment/job-detail/job-detail.component';
import { AllCandidatesComponent } from './components/recruitment/all-candidates/all-candidates.component';
import { EstimatesComponent } from './components/estimates/estimates.component';
import { EstimatesOverviewComponent } from './components/estimates/estimates-overview/estimates-overview.component';
const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: MainDashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'invoices',
        children: [
          {
            path: 'overview',
            component: AllInvoicesComponent,
          },
          {
            path: 'create',
            component: NewInvoiceComponent,
          },
          {
            path: 'edit/:id',
            component: NewInvoiceComponent,
          },
          {
            path: 'check',
            component: InvoiceCheckComponent,
          },
          {
            path: 'check/:id',
            component: InvoiceCheckComponent,
          },
          {
            path: 'ready',
            component: ReadyComponent,
          },
          {
            path: 'download/:id',
            component: ReadyComponent,
          },
        ],
      },
      {
        path: 'estimates',
        children: [
          {
            path: 'overview',
            component: EstimatesOverviewComponent,
          },
          {
            path: 'create',
            component: EstimatesComponent,
          },
          {
            path: 'check',
            component: EstimatesComponent,
          },
          {
            path: 'ready',
            component: EstimatesComponent,
          },
        ],
      },
      {
        path: 'clients',
        children: [
          {
            path: 'overview',
            component: AllClientsComponent,
          },
          {
            path: 'create',
            component: CreateClientComponent,
          },
        ],
      },
      { path: 'products', component: ProductsComponent },
      {
        path: 'account',
        component: OrganizationComponent,
      },
      {
        path: 'chat',
        component: ChatComponent,
      },
      {
        path: 'recruitment',
        component: RecruitmentComponent,
      },
      { path: 'recruitment/create-job', component: CreateJobComponent },
      { path: 'recruitment/applicants/:id', component: JobApplicantsComponent },
      { path: 'recruitment/job/:id', component: JobDetailComponent },
      { path: 'recruitment/all-candidates', component: AllCandidatesComponent },
      {
        path: 'recruitment/applicant/:id',
        component: ApplicantDetailComponent,
      },
      {
        path: 'recruitment/create-job/step-2',
        component: JobDescriptionComponent,
      },
      {
        path: 'recruitment/create-job/step-3',
        component: ApplicantFormComponent,
      },
      {
        path: 'recruitment/create-job/step-4',
        component: ApplicantProcessComponent,
      },
    ],
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
