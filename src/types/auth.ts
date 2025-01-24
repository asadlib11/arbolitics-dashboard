export interface LoginCredentials {
  email: string;
  password: string;
}

export interface Company {
  id: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  name: string;
  createdBy: number;
}

export interface User {
  id: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
  role: string;
  isSubscribed: boolean;
  lang: string;
  company: Company;
  accessToken: string;
}

export interface AuthResponse {
  data: User;
}
