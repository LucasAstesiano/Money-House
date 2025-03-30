import axios from 'axios';

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

    async signUp(user: User): Promise<any> {
        try {
            const response = await axios.post(`${this.apiUrl}/users`, user);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Error signing up');
        }
    }

    async login(email: string, password: string): Promise<any> {
        try {
            const response = await axios.post(`${this.apiUrl}/login`, { email, password });
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.error || 'Error logging in');
        }
    }
}

export default new AuthService();