export enum Role {
  ADMIN = 'admin',
  DEVOTEE = 'devotee',
}

export interface User {
  id: string;
  username: string;
  role: Role;
}

export interface Seva {
  id: string;
  name: string;
  description: string;
  timing: string;
  imageUrl: string;
  amount: number;
}

export interface Donation {
  id: string;
  devoteeId: string;
  devoteeName: string;
  gotram?: string;
  phoneNumber?: string;
  familyNames?: string;
  amount: number;
  date: string;
  seva: string;
  paymentId?: string;
}