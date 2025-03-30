import MainLayout from '@/app/Components/MainLayout';
import Profile from '@/app/Components/Profile';
import React from 'react';

const ProfilePage: React.FC = () => {
    return (
        <MainLayout>
            <Profile/>
        </MainLayout>
    );
};

export default ProfilePage;