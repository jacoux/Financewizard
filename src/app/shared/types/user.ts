export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  companyId?: string | undefined;
  emailVerified: boolean;
}