import { User } from "./user"

export interface Invoice {
    client: Client,
    organization: Organization,
    product: Product,
    total: number
 }

 export interface Client {
    _id: string
    email: string
    vat: string
    name: string
    responsible: string
    organizationId: string
    firstName?: string
    lastName?: string
    tel?: string
    address?: string
    description?: string
    createdAt?: Date
    updatedAt?: Date
 }

export interface Product {
    _id: string
    name: string
    organizationId: number
    vatPercentage: string
    price: number
    description: string 
    currency: Currency
    isHourlyRate?: boolean
 }

 export enum Priority {
    LOW,
    MEDIUM,
    HIGH
}

export enum Currency {
    EURO,
    POND,
    DOLLAR
}

 export interface Organization {
   $key: string;
   name: string;
   companyVat: string;
   companyEmail: string;
   address: Address;
   responsible: Responsible[];
   bank: Bank[];
   defaultInvoiceDetails: DefaultInvoiceDetails
   users: User
 }

 export interface Address {
   streetName: string;
   streetNumber: string;
   busNumber?: string;
   postalCode: number;
   city: number;
 }

 export interface Responsible {
   firstName: string;
   lastName: string;
   email: string;
   phoneNumber?: number;
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