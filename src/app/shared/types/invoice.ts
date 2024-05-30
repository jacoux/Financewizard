import { User } from './user';

export interface Invoice {
  paymentDetails: any;
  client: Client;
  organization: Organization;
  product: Product;
  invoiceDate: Date;
  paymentDate: Date;
  invoiceNumber: number;
  payWithin: number;
  total: number;
  vatAmount: number;
  invoiceName: string;
  footer: number;
}

export interface Client {
  id?: any;
  email: string;
  vat: string;
  name: string;
  responsible?: string;
  companyId?: string;
  firstName?: string;
  lastName?: string;
  tel?: string;
  address?: Address;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ClientResponse {
  items: Client[]; 
  page: 1
  perPage: 30
  totalItems: 1
  totalPages: 1
}
export interface InvoiceResponse {
  items: Invoice[]; 
  page: 1
  perPage: 30
  totalItems: 1
  totalPages: 1
}

export interface Product {
  qty?: any;
  id: string;
  name: string;
  companyId: number;
  vatPercentage: string;
  price: number;
  vatApplicable?: boolean;
  description: string;
  currency: Currency;
  isHourlyRate?: boolean;
}

export interface ProductResponse {
  items: Client[];
  page: 1;
  perPage: 30;
  totalItems: 1;
  totalPages: 1;
}



export enum Priority {
  LOW,
  MEDIUM,
  HIGH,
}

export enum Currency {
  EURO,
  POND,
  DOLLAR,
}

export enum AccountType {
  PERSONAL,
  ORGANIZATION,
  PROFINANCE,
  LIGHTHR,
  PROHR,
}

export interface Organization {
  companyId?: any;
  companyName?: string;
  id: string;
  $key: string;
  name: string;
  description: string;
  sector?: string;
  accountType: AccountType;
  employee: Employee[];
  companyVat: string;
  companyEmail: string;
  address: Address;
  logo: string;
  responsible: Responsible[];
  bank?: Bank[];
  invoiceNumberPrefix?: string;
  templateNo?: number;
  defaultInvoiceDetails?: DefaultInvoiceDetails;
}

export interface Address {
  streetName: string;
  streetNumber: string;
  busNumber?: string;
  postalCode: number;
  city: number;
  country: string;
}

export interface Responsible {
  firstName?: string;
  lastName?: string;
  email: string;
  phoneNumber?: number;
}

export interface Employee {
  email: string;
  role?: string;
}

export interface Bank {
  bankAccountNumber: string;
  swift: string;
  nameBankAccount: string;
}

export interface DefaultInvoiceDetails {
  footer?: string;
  subTitle?: string;
  invoiceNumberStart?: string;
  image?: string;
}
