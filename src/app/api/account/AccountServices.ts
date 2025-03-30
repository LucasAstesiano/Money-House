import axios from 'axios';

const API_BASE_URL = 'https://digitalmoney.digitalhouse.com/api/account';
const token = localStorage.getItem('token')?? null;

export const AccountServices = {
    // Fetch account data by account ID
    getAccountData: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}`, {
                headers: {
                    Authorization: `${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching account data:', error);
            throw error;
        }
    },
    

    // Update account data by account ID
    updateAccountData: async (accountId: string, updatedData: Record<string, any>) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/${accountId}`, updatedData);
            return response.data;
        } catch (error) {
            console.error('Error updating account data:', error);
            throw error;
        }
    },
};