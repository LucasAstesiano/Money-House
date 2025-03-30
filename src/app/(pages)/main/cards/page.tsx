import Cards from '@/app/Components/Cards';
import MainLayout from '@/app/Components/MainLayout';
import React from 'react';

const GreetingPage: React.FC = () => {
    return (
        <MainLayout>
            <Cards/>
        </MainLayout>
    );
};

export default GreetingPage;