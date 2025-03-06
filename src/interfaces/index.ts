export interface AuthSliceInitialState {
  isLoading: boolean;
  error: null | string;
  user?: User | null;
  token?: string | null;
  success?: string | null;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  photo: string;
  createdAt: string;
}

export interface AuthSignUpBody {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  dateOfBirth: string | null;
  gender: string;
}

export interface AuthLoginBody {
  email: string;
  password: string;
}
