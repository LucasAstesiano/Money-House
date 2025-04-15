'use client'
// pages/index.tsx
import Header from "@/app/Components/Header";
import { useRouter } from "next/navigation";
import React from "react";
import { FC } from "react";


interface ServiceCardProps {
  title: string;
  description: string;
}

const ServiceCard: FC<ServiceCardProps> = ({ title, description }) => {
  return (
    <div className="bg-white w-[90%] md:w-[35%] mb-4 h-58 rounded-xl py-6  px-14 shadow-md transition-transform hover:transform hover:scale-[1.02] z-3 cursor-pointer mx-1">
      <h3 className="text-3xl font-bold mb-2 text-black pb-2 border-b-lime-400 border-b-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Home: FC = () => {

  const router = useRouter();
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/main");
    }
    
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#3A33E]">
      <Header
        imgUrl="/Logo 01.png"
        color="#201F22"
        showLoginButton={true}
        showSignupButton={true}
        loginColor="#201F22"
        singupColor="#C1FD35"
      />
      {/* Hero Section */}
      <main className="flex-grow relative bg-cover bg-center" style={{backgroundImage:"url('/fondo-landing.png')",backgroundPosition:"center -24px"}}>
        <div className="absolute inset-0  -z-10" />
        <div className="container mx-auto px-4 py-12 mt-20">
          <div className="z-10 ml-2">
            <h1 className="w-82 text-2xl md:text-5xl mb-4 text-white">
              De ahora en adelante, hacés más con tu dinero
            </h1>
            <p className="text-lime-400 mb-2 text-2xl">
              Tu nueva{" "}
              <span className="text-lime-400 font-bold">
                billetera virtual
              </span>
            </p>

            <div className="flex flex-col md:flex-row justify-center mt-16">
              <ServiceCard
                title="Transferí dinero"
                description="Desde Digital Money House vas a poder transferir dinero a otras cuentas, así como también recibir transferencias y nuclear tu capital en nuestra billetera virtual"
              />
              <ServiceCard
                title="Pago de servicios"
                description="Pagá mensualmente los servicios en 3 simples clicks. Fácil, rápido y conveniente. Olvídate de las facturas en papel"
              />
            </div>
          </div>

          <div className="hidden md:flex justify-center items-center h-full relative">
          </div>
        </div>

        {/* Lime accent at bottom */}
        <div className="bg-lime-400 h-80 md:h-46 absolute bottom-0 left-0 right-0 z-2 rounded-t-3xl"></div>
      </main>
      {/* Footer */}
      <footer className="bg-[#3A393E] text-lime-400 py-4 pl-2.5 text-left text-sm">
        <p>© 2025 Digital Money House</p>
      </footer>
    </div>
  );
};

export default Home;
