'use client'
import Header from '@/app/Components/Header';
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const SignupSuccess: React.FC = () => {
const router = useRouter();

    const handleContinue = () => {
        // Handle the continue button click
        router.push("/login")
    };

    return (
        <div className='bg-[#3A393E] min-h-screen'>
            <Header color={'#C1FD35'} loginColor={''} singupColor={''} imgUrl='/Logo 02.png' />
        <div style={{ textAlign: 'center', padding: '20px' }} className='flex flex-col items-center mt-10'>
            <h1 className='text-5xl text-white'>Registro Exitoso</h1>
            <div className='my-5'>
                <Image src={"/Check.png"} alt={'Succes'} width={100} height={100}/>
                {/*<img src="/check.png" alt="Success" style={{ width: '100px', height: '100px' }} />*/}
            </div>
            <p className='text-gray-200 w-full md:w-xl'>Hemos enviado un correo de confirmación para validar tu email, por favor revisalo para iniciar sesión</p>
            <button  onClick={handleContinue} className='bg-[#C1FD35] rounded-sm mt-10 text-black' style={{ padding: '10px 20px', fontSize: '16px' }}>Continuar</button>
        </div>
        </div>
    );
};

export default SignupSuccess;