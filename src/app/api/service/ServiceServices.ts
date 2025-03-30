import axios from 'axios';
const API_BASE_URL = 'https://digitalmoney.digitalhouse.com/service/';
const token = localStorage.getItem('token')?? null;

export const  ServiceServices = {
    // Fetch account data by account ID

    
    getservicedata: async () => {
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
    

    searchService: async (query: string) => {
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