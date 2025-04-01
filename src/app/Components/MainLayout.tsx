'use client'
import React from "react";
import Header from "./Header";
import { useRouter} from "next/navigation";
import Footer from "./Footer";


const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router= useRouter();
    const [token, setToken] = React.useState<string | null>(null);

    React.useEffect(() => {
        const getToken = localStorage.getItem('token');
        if (!getToken) {
            router.push('/login');
        }else{
            setToken(getToken);
        }
    }, [router]);
    const agregarParametro = (item: { value: string }) => {
        if (item.value === 'close') {
          localStorage.removeItem('token');
          router.push('/login');
          return;
        }
    router.push(`/main/${item.value}`);
      };  
    const items = [
        {
            name:'Inicio',
            value:'inicio'
        },
        {
            name:'Actividad',
            value:'actividad'
        },
        {
            name:'Tu perfil',
            value:'profile'
        },
        {
            name:'Cargar dinero',
            value:'insertMoney'
        },
        {
            name:'Pagar Servicios',
            value:'services'
        },
        {
            name:'Tarjetas',
            value:'cards'
        },
        {
            name:'Cerrar sesión',
            value:'close'
        }];
         
  return (
    <div>
{token && (
<>
    <Header imgUrl='/logo 01.png' color='#3A393E' loginColor={''} singupColor={''}/>
    <div style={{ display: 'flex'  }} className='min-h-screen'>
        <div style={{ width: '200px', borderRight: '1px solid #ccc', padding: '10px' }} className='bg-[#C1FD35] hidden md:block'>
            <ul style={{ listStyleType: 'none', padding: 0}} >
                {items.map(item => (
                    <li key={item.name} style={{ margin: '10px 0', cursor: 'pointer' }} className='pl-4' onClick={() => agregarParametro(item)}>
                        {item.name}
                    </li>
                ))}
            </ul>
        </div>
        {children}
    </div>
    <Footer/>
</>
)}
    </div>
  );
};

export default MainLayout;
