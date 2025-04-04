'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ServicesResponse from '@/app/interfaces/ServicesType';
import { ServiceServices } from '@/app/api/service/ServiceServices';
import servicesList from '@/app/utils/servicesList';


const Services: React.FC = () => {

    const router = useRouter();

    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<ServicesResponse[]>([])
    const [data, setData] = useState([])


    interface HandleChangeEvent {
        target: {
            value: string;
        };
    }
    useEffect(()=>{
        const data2 =ServiceServices.getservicedata()
        .then((data2) => setData(data2))
        setData(data)
        console.log(data2);
        
    },[])

    const handleChange = (e: HandleChangeEvent): void => {
        setSearchTerm(e.target.value);
        ServiceServices.searchService(searchTerm)
            .then((data) => {
                setResults(data);
                console.log(results);
                
            })
            .catch((error) => {
                console.error('Error fetching services:', error);
            });
    };
    const handleSelected = (id:number) => {
        router.push(`/main/services/${id}`)
    }
    
    


    const filteredOptions = servicesList.filter(option =>
        option.name.toLowerCase().includes(searchTerm.toLowerCase())
    ); 

    return (
        <div className="p-4 w-full bg-[#f0f0f0] pt-8">
            <input
                type="text"
                placeholder={`🔍︎ Buscá entre mas de 5.000 empresas`}
                className="w-full px-2 py-3  bg-white rounded mb-4 shadow-md shadow-gray-400"
                value={searchTerm}
                onChange={(e) => handleChange(e)}
                style={{boxShadow: '2px 2px 2px 2px #D3D3D3'}}
            />
            <ul className="p-5 bg-white rounded-md list-none" style={{boxShadow: '2px 2px 2px 2px #D3D3D3'}}>
                <h3 className='font-bold'>Más recientes</h3>
                {filteredOptions.map(option => (
                    <li key={option.id} className="flex justify-between m-2 border-t-2 p-2 h-16 border-gray-200 last:border-b-2">
                        <div className='flex'>
                            <Image src={option.image} alt={option.alt} width={50} height={30}/>
                            <span className='ml-8 text-gray-500'>{option.name}</span>
                        </div>
                        <p className='font-bold cursor-pointer hover:text-gray-400' onClick={()=>{handleSelected(option.id)}}>Selecionar</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Services;