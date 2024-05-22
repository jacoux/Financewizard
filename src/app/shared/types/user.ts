export interface User {
  id: string;
  email: string;
  username: string;
  photoURL: string;
  linkedCompany: string[];
  verified: boolean;
  customVerified?: boolean;
}