'use client';
import axios from 'axios';
import { AccountServices } from '../account/AccountServices';

const API_BASE_URL = 'https://digitalmoney.digitalhouse.com/api/accounts/';

export const CardServices = {
    // Fetch account data by account ID

    
    getCardData: async () => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') ?? null : null;  // <-- 1. protegemos
        const accountData = await AccountServices.getAccountData();
        const id = String(accountData?.id);
        console.log("id:" + id);
        
        try {
            const response = await axios.get(`${API_BASE_URL}${id}/cards`, {
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

    addCard: async ( cardData: Record<string, unknown>) => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') ?? null : null;  // <-- 1. protegemos
        const cards = await CardServices.getCardData();
        if (cards.length >= 10) {
            throw('No puedes tener más de 10 tarjetas');   
        }
        const accountData = await AccountServices.getAccountData();
        const id = String(accountData?.id);
        try {
            const response = await axios.post(`${API_BASE_URL}${id}/cards`, cardData, {
                headers: {
                    Authorization: `${token}`
                }
            });
            console.log('creada con exito');
            
            return response.data;
        } catch (error) {
            console.error('Error adding new card:', error);
            throw error;
        }
    },
    

    // Update account data by account ID
    updateCardData: async (accountId: string, updatedData: Record<string, unknown>) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/${accountId}`, updatedData);
            return response.data;
        } catch (error) {
            console.error('Error updating account data:', error);
            throw error;
        }
    },

    deleteCard: async (cardId: number) => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') ?? null : null;  // <-- 1. protegemos
        const accountData = await AccountServices.getAccountData();
        const id = String(accountData?.id);
        try {
            const response = await axios.delete(`${API_BASE_URL}${id}/cards/${cardId}`, {
                headers: {
                    Authorization: `${token}`
                }
            });
            console.log('Card deleted successfully');
            return response.data;
        } catch (error) {
            console.error('Error deleting card:', error);
            throw error;
        }
    }
};