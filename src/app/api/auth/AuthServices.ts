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

    async signUp(user: User): Promise<unknown> {
        try {
            const response = await axios.post(`${this.apiUrl}/users`, user);
            return response.data;
        } catch (error: unknown) {
            const axiosError = error as AxiosError<{ error: string }>;
            return { error: axiosError.response?.data?.error || "Error sigin in" };
        }
    }

    async login(email: string, password: string): Promise<{token?: string; error?: string }> {
        try {
            const response = await axios.post(`${this.apiUrl}/login`, { email, password });
            return {token :response.data.token};
        } catch (error: unknown) {
            const axiosError = error as AxiosError<{ error: string }>;
            console.log(error);
            
      return { error: axiosError.response?.data?.error || "Error logging in" };
        }
    }
}

const authServiceInstance = new AuthService();
export default authServiceInstance;