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
import { ClientComponent } from './components/client/client.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from '../components/shared/table/table.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { SidebarComponent } from '../components/shared/sidebar/sidebar.component';
import { HeaderComponent } from '../components/shared/header/header.component';
import { WelcomeMessageComponent } from '../components/shared/welcome-message/welcome-message.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { AddProductModalComponent } from './components/products/add-product-modal/add-product-modal.component';
import { ChatComponent } from './components/chat/chat.component';
import { CreateJobComponent } from './components/recruitment/create-job/create-job.component';
import { RecruitmentComponent } from './components/recruitment/recruitment.component';
import { ApplicantFormComponent } from './components/recruitment/create-job/applicant-form/applicant-form.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ApplicantProcessComponent } from './components/recruitment/create-job/applicant-process/applicant-process.component';
import { AngularJsonFormModule } from 'angular-json-form';
import { JobDescriptionComponent } from './components/recruitment/create-job/job-description/job-description.component';
import { JobApplicantsComponent } from './components/recruitment/job-applicants/job-applicants.component';
import { ApplicantDetailComponent } from './components/recruitment/job-applicants/applicant-detail/applicant-detail.component';
import { JobDetailComponent } from './components/recruitment/job-detail/job-detail.component';
import { AllCandidatesComponent } from './components/recruitment/all-candidates/all-candidates.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EstimatesComponent } from './components/estimates/estimates.component';
import { StepperComponent } from '../components/shared/stepper/stepper.component';
import { AllInvoicesComponent } from './components/invoices/all-invoices/all-invoices.component';

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
    OrganizationComponent,
    InvoiceCheckComponent,
    Template1Component,
    Template2Component,
    Template3Component,
    ReadyComponent,
    TableComponent,
    MainDashboardComponent,
    AddProductModalComponent,
    ChatComponent,
    CreateJobComponent,
    RecruitmentComponent,
    ApplicantFormComponent,
    ApplicantProcessComponent,
    JobDescriptionComponent,
    JobApplicantsComponent,
    ApplicantDetailComponent,
    JobDetailComponent,
    AllCandidatesComponent,
    EstimatesComponent,
    StepperComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    DragDropModule,
    AngularJsonFormModule,
    MatTableModule,
    MatPaginatorModule,
  ],
})
export class DashboardModule {}
