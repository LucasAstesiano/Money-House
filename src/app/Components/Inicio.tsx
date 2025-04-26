'use client'
import React, { useEffect } from 'react';
import { useDataContext } from '../context/DataContext';
import { AccountServices } from '../api/account/AccountServices';
import { useRouter } from 'next/navigation';
import Activity from './Activity';

const Inicio: React.FC = () => {

      const {setAccountData,accountData} = useDataContext();
        const router = useRouter();

      useEffect(() => {
        AccountServices.getAccountData().then((response) => {
          setAccountData(response);
          
          
        })
      }
      , []);
      const formatoMoneda = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2,
      });


    return (
        <div className="bg-[#f0f0f0] min-h-screen p-4 w-full">
            <header className="flex justify-between items-center mb-8 p-6 md:p-8 bg-[#3A393E] rounded shadow" style={{boxShadow: '2px 2px 6px 2px #D3D3D3'}}>
                <div className="text-white ">
                    <h1 className="text-l mb-2 mt-4">Dinero disponible</h1>
                    <p className="text-2xl border-2 border-[#C1FD35] rounded-3xl p-2"> {accountData != null ? formatoMoneda.format(accountData.available_amount): formatoMoneda.format(0) }</p>
                </div>
                <div className="text-gray-200 h-30">
                    <a  className="mr-4 cursor-pointer"  onClick={()=>{router.push('/main/cards')}}>Ver tarjetas</a>
                    <a  className="mr-4 cursor-pointer"onClick={()=>{router.push('/main/insertMoney/transf')}}>Ver CVU</a>
                </div>
            </header>
            <div className="flex justify-around mb-8">
                <button className="bg-[#C1FD35] w-[45%] text-black py-8 px-10 rounded cursor-pointer" style={{boxShadow: '2px 2px 6px 2px #D3D3D3'}} onClick={()=>{router.push('/main/insertMoney')}}>Cargar dinero</button>
                <button className="bg-[#C1FD35] w-[45%] text-black py-8 px-10 rounded cursor-pointer" style={{boxShadow: '2px 2px 6px 2px #D3D3D3'}} onClick={()=>{router.push('/main/services')}}>Pago de servicios</button>
            </div>
            
            <Activity ShowButton={true} />
        </div>
    );
};

export default Inicio;