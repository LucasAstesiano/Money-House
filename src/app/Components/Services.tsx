'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { ServiceServices } from '../api/service/ServiceServices';

interface Option {
    id: number;
    name: string;
    img:string;
}
interface Results{
        id: 0,
        name: string,
        date: string,
        invoice_value: 0
}

const options: Option[] = [
    { id: 1, name: 'Claro',img:"/logo claro.png" },
    { id: 2, name: 'personal',img:"/logo personal.png"  },
    { id: 3, name: 'cablevision',img:"/logo cablevision.png"  },
    { id: 4, name: 'Claro',img:"/logo claro.png"  },
    { id: 5, name: 'personal',img:"/logo personal.png"  },
    { id: 6, name: 'cablevision',img:"/logo cablevision.png"  },
    { id: 7, name: 'Claro',img:"/logo claro.png"  },
];

const Services: React.FC = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<Results[]>([])
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
    },[])

    const handleChange = (e: HandleChangeEvent): void => {
        setSearchTerm(e.target.value);
        ServiceServices.searchService(searchTerm)
            .then((data) => {
                setResults(data);
            })
            .catch((error) => {
                console.error('Error fetching services:', error);
            });
    };
    
    


    /* const filteredOptions = options.filter(option =>
        option.name.toLowerCase().includes(searchTerm.toLowerCase())
    ); */

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
                {data.map(option => (
                    <li key={option.id} className="flex justify-between m-2 border-t-2 p-2 border-gray-200 last:border-b-2">
                        <div className='flex'>
                            <Image src={option.img} alt={'globe'} width={50} height={20}/>
                            <span className='ml-8 text-gray-500'>{option.name}</span>
                        </div>
                        <p className='font-bold cursor-pointer'>Selecionar</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Services;