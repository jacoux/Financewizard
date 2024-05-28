export interface User {
  id: string;
  email: string;
  username: string;
  photoURL: string;
  linkedCompany: any;
  verified: boolean;
  customVerified?: boolean;
}