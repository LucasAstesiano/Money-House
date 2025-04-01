'use client'
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useDataContext } from '../context/DataContext';
import { AccountServices } from '../api/account/AccountServices';
import { useRouter } from 'next/navigation';

const Inicio: React.FC = () => {

      const {setAccountData,accountData} = useDataContext();
        const router = useRouter();
      useEffect(() => {
        AccountServices.getAccountData().then((response) => {
          setAccountData(response);
          
          
        })
      }
      , []);


    return (
        <div className="bg-[#f0f0f0] min-h-screen p-4 w-full">
            <header className="flex justify-between items-center mb-8 p-6 md:p-8 bg-[#3A393E] rounded shadow" style={{boxShadow: '2px 2px 6px 2px #D3D3D3'}}>
                <div className="text-white ">
                    <h1 className="text-l mb-2 mt-4">Dinero disponible</h1>
                    <p className="text-2xl border-2 border-[#C1FD35] rounded-3xl p-2">$ {accountData?.available_amount}</p>
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
            <div className="mb-8">
                <input 
                    type="text" 
                    placeholder=" 🔍︎ Buscar en tu actividad" 
                    className="w-full p-2 py-3 rounded bg-white shadow"
                    style={{boxShadow: '2px 2px 6px 2px #D3D3D3'}}
                />
            </div>
            <section className='bg-white p-4 rounded' style={{boxShadow: '2px 2px 6px 2px #D3D3D3'}}>
                <h2 className="text-black text-xl mb-4 border-b-2">Tu actividad</h2>
                <ul>
                <li className="flex justify-between items-center mb-4 text-black border-b-1 border-gray-400">
                        <div className="flex items-center">
                        <Image src={'/Ellipse 7.png'} alt={'Elipse'} width={25} height={25}/>
                            <div className="bg-neon-green rounded-full h-8 w-8 mr-4"></div>
                            <span>Transferiste a Rodrigo</span>
                        </div>
                        <div className='flex flex-col'>
                            <span>$ 1265,57</span>
                            <span className="ml-4 text-gray-600">sábado</span>
                        </div>
                    </li><li className="flex justify-between items-center mb-4 text-black border-b-1 border-gray-400">
                        <div className="flex items-center">
                        <Image src={'/Ellipse 7.png'} alt={'Elipse'} width={25} height={25}/>
                            <div className="bg-neon-green rounded-full h-8 w-8 mr-4"></div>
                            <span>Transferiste a Rodrigo</span>
                        </div>
                        <div className='flex flex-col'>
                            <span>$ 1265,57</span>
                            <span className="ml-4 text-gray-600">sábado</span>
                        </div>
                    </li>
                    <li className="flex justify-between items-center mb-4 text-black border-b-1 border-gray-400">
                        <div className="flex items-center">
                        <Image src={'/Ellipse 7.png'} alt={'Elipse'} width={25} height={25}/>
                            <div className="bg-neon-green rounded-full h-8 w-8 mr-4"></div>
                            <span>Transferiste a Rodrigo</span>
                        </div>
                        <div className='flex flex-col'>
                            <span>$ 1265,57</span>
                            <span className="ml-4 text-gray-600">sábado</span>
                        </div>
                    </li>
                    {/* Repite el bloque <li> para más transacciones */}
                </ul>
                <button className="md:bg-[#C1FD35] text-black py-2 px-4 rounded mt-4 flex" onClick={()=>router.push("/main/actividad")}>Ver toda tu actividad <span className='md:hidden block'> →</span></button>
            </section>
        </div>
    );
};

export default Inicio;