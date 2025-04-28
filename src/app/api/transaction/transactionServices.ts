'use client';
import axios from 'axios';
import { AccountServices } from '../account/AccountServices';
import { TransactionData } from '@/app/interfaces/TransactionType';

const API_BASE_URL = 'https://digitalmoney.digitalhouse.com/api/accounts/';

export const transactionServices = {
    
    //puse el services de otra cosa para usarlo como modelo, hay que cambiar los metodos para adaptarlos a
    //el servicio de transferencias, necesito poder hacer la carga de plata en la api.

    addMoney: async (transactionData: TransactionData) => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') ?? null : null;
      
        const accountData = await AccountServices.getAccountData();
        const id = String(accountData?.id);
      
        // Asegúrate de que amount sea un número
        if (typeof transactionData.amount === 'string') {
          transactionData.amount = parseFloat(transactionData.amount);
        }
      
        try {
          const response = await axios.post(`${API_BASE_URL}${id}/deposits`, transactionData, {
            headers: {
              Authorization: `${token}`,
            },
          });
          console.log('Transaction added successfully');
          return response.data;
        } catch (error) {
          console.error('Transaction failed:', error);
          throw error;
        }
      }
};