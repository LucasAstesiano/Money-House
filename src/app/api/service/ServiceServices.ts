import axios from 'axios';
const API_BASE_URL = 'https://digitalmoney.digitalhouse.com/service/';

export const  ServiceServices = {
    // Fetch account data by account ID

    
    getservicedata: async () => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') ?? null : null;  // <-- 1. protegemos
        try {
            const response = await axios.get(`${API_BASE_URL}`, {
                headers: {
                    Authorization: `${token}`
                }
            });
            console.log(response.data);        
            return response.data;
        } catch (error) {
            console.error('Error fetching services data:', error);
            throw error;
        }
    },
    getServiceById: async (id: number) => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') ?? null : null;  // <-- 1. protegemos
        try {
            const response = await axios.get(`${API_BASE_URL}${id}`, {
                headers: {
                    Authorization: `${token}`
                }
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching service by ID:', error);
            throw error;
        }
    },
    

    searchService: async (query: string) => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') ?? null : null;  // <-- 1. protegemos
        try {
            const response = await axios.get(`${API_BASE_URL}${query}`, {
                headers: {
                    Authorization: `${token}`
                }
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error searching for service:', error);
            throw error;
        }
    }
}