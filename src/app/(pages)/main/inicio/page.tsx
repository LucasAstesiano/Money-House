import Inicio from '@/app/Components/Inicio';
import MainLayout from '@/app/Components/MainLayout';
import React from 'react';

const Page: React.FC = () => {
    return (
        <MainLayout >
            <Inicio />
        </MainLayout>
    );
};

export default Page;