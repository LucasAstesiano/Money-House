'use client'
import axios from 'axios';


const API_BASE_URL = 'https://digitalmoney.digitalhouse.com/api/account';

  
  export const AccountServices = {
      
      // Fetch account data by account ID
      getAccountData: async () => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') ?? null : null;  // <-- 1. protegemos
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
    updateAccountData: async (accountId: string, updatedData: Record<string, unknown>) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/${accountId}`, updatedData);
            return response.data;
        } catch (error) {
            console.error('Error updating account data:', error);
            throw error;
        }
    },
};