'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AccountData {
    alias:string,
    available_amount:0,
    cvu:string,
    id:0,
    user_id:0
}

interface DataContextProps {
    accountData: AccountData | null;
    setAccountData: (data: AccountData | null) => void;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [accountData, setAccountData] = useState<AccountData | null>(null);

    return (
        <DataContext.Provider value={{ accountData, setAccountData }}>
            {children}
        </DataContext.Provider>
    );
};

export const useDataContext = (): DataContextProps => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useDataContext must be used within a DataProvider');
    }
    return context;
};