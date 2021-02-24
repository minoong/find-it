import axios from '.';
import { UserType } from '../../types/user';

interface SignUpAPIBody {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  birthday?: string;
}

export const signUpAPI = (body: SignUpAPIBody) => axios.post<UserType>('api/auth/signup', body);
export const signInAPI = (body: { email: string; password: string }) => axios.post<UserType>('api/auth/login', body);
export const trackingAPI = () => axios.get<UserType>('api/auth/track');
export const logoutAPI = () => axios.delete('api/auth/logout');
