import SignUpResponseType, { LoginResponseType } from '@/app/interfaces/SignUpType';
import axios, { AxiosError } from 'axios';

interface User {
    firstname: string,
    lastname: string,
    dni: number,
    email: string,
    password: string,
    confirmPassword: string,
    phone: string
  };

class  AuthService {
    private apiUrl = 'https://digitalmoney.digitalhouse.com/api';

    async signUp(user: User): Promise<SignUpResponseType> {
        try {
            const response = await axios.post(`${this.apiUrl}/users`, user);
            return {Status:response.status,data:response.data};
        } catch (error: unknown) {
            const axiosError = error as AxiosError<{ error: string }>;
            return { Status: axiosError.response?.status || 500, error: axiosError.response?.data?.error || "Error signing in" };
        }
    }

    async login(email: string, password: string): Promise<LoginResponseType> {
        try {
            const response = await axios.post(`${this.apiUrl}/login`, { email, password });
            return { Status: response.status, token: response.data.token };
        } catch (error: unknown) {
            const axiosError = error as AxiosError<{ error: string }>;
            console.log(error);
            
      return { Status: axiosError.response?.status || 500, error: axiosError.response?.data?.error || "Error logging in" };
        }
    }
}

const authServiceInstance = new AuthService();
export default authServiceInstance;