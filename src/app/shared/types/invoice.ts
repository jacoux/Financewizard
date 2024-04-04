import { User } from './user';

export interface Invoice {
  client: Client;
  organization: Organization;
  product: Product;
  total: number;
}

export interface Client {
  _id: string;
  email: string;
  vat: string;
  name: string;
  responsible: string;
  organizationId: string;
  firstName?: string;
  lastName?: string;
  tel?: string;
  address?: string;
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

export interface Product {
  _id: string;
  name: string;
  organizationId: number;
  vatPercentage: string;
  price: number;
  description: string;
  currency: Currency;
  isHourlyRate?: boolean;
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
  responsible: Responsible[];
  bank?: Bank[];
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
