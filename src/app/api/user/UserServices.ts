import axios from 'axios';
import { AccountServices } from '../account/AccountServices';

const API_BASE_URL = 'https://digitalmoney.digitalhouse.com/api/users/';
const token = localStorage.getItem('token')?? null;

export const UserServices = {
    // Fetch account data by account ID

    
    getUserData: async () => {
        const accountData = await AccountServices.getAccountData();
        const userId = String(accountData?.user_id);
        console.log("id:" + userId);
        
        try {
            const response = await axios.get(`${API_BASE_URL}${userId}`, {
                headers: {
                    Authorization: `${token}`
                }
            });
            console.log(response.data);        
            return response.data;
        } catch (error) {
            console.error('Error fetching account data:', error);
            throw error;
        }
    },
    

    // Update account data by account ID
    updateUserData: async (accountId: string, updatedData: Record<string, unknown>) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/${accountId}`, updatedData);
            return response.data;
        } catch (error) {
            console.error('Error updating account data:', error);
            throw error;
        }
    },
};