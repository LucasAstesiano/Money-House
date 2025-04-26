'use client'
import React from "react";
import Header from "./Header";
import { useRouter} from "next/navigation";
import Footer from "./Footer";
import imagenes from "../utils/imagenes";
import { UserServices } from "../api/user/UserServices";
import UserType from "../interfaces/UserType";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router= useRouter();
    const [token, setToken] = React.useState<string | null>(null);
    const [userData, setUserData] = React.useState<UserType | null>(null);
    

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
          const getToken = localStorage.getItem('token');
          if (!getToken) {
            router.push('/login');
          } else {
            setToken(getToken);
          }
      
          UserServices.getUserData()
            .then((data) => {
              setUserData(data);
            })
            .catch((error) => {
              console.error("Error fetching user data:", error);
            });
        }
      }, [router]);
    

    
      const agregarParametro = (item: { value: string }) => {
        if (item.value === 'close') {
          if (typeof window !== 'undefined') {
            localStorage.removeItem('token'); // Ahora está protegido
          }
          router.push('/home');
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
    <Header imgUrl={imagenes.logo1} color='#3A393E' loginColor={''} singupColor={''} name={userData?.firstname + " " + userData?.lastname}/>
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


