'use client'
import Activity from '@/app/Components/Activity';
import MainLayout from '@/app/Components/MainLayout';
import React from 'react';

const ActividadPage: React.FC = () => {

    
    return (
        <MainLayout>
            <Activity ShowButton={false}/>
        </MainLayout>
    );
};

export default ActividadPage;