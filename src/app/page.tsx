"use client";
// pages/index.tsx
import Header from "@/app/Components/Header";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";

interface ServiceCardProps {
  title: string;
  description: string;
}

const ServiceCard: FC<ServiceCardProps> = ({ title, description }) => {
  return (
    <div className="bg-white w-[90%] md:w-[40%] mb-4 h-48 rounded-xl p-6 shadow-md transition-transform hover:transform hover:scale-[1.02] z-3 cursor-pointer">
      <h3 className="text-2xl font-bold mb-2 text-gray-800 border-b-lime-400 border-b-2">
        {title}
      </h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Home: FC = () => {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        router.push("/main");
      }
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#3A33E]">
      <Header
        imgUrl="/Logo 01.png"
        color="#3A393E"
        showLoginButton={true}
        showSignupButton={true}
        loginColor="#3A393E"
        singupColor="#C1FD35"
      />
      {/* Hero Section */}
      <main
        className="flex-grow relative bg-cover bg-center"
        style={{
          backgroundImage: "url('/fondo-landing.png')",
          backgroundPosition: "center top",
        }}
      >
        <div className="absolute inset-0  -z-10" />
        <div className="container mx-auto px-4 py-12 ">
          <div className="z-10">
            <h1 className="w-72 text-3xl md:text-4xl font-bold mb-4 text-white">
              De ahora en adelante, hacés más con tu dinero
            </h1>
            <p className="text-white mb-2 text-lg">
              Tu nueva{" "}
              <span className="text-lime-400 font-semibold">
                billetera virtual
              </span>
            </p>

            <div className="flex flex-col md:flex-row justify-around mt-16">
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

          <div className="hidden md:flex justify-center items-center h-full relative"></div>
        </div>

        {/* Lime accent at bottom */}
        <div className="bg-lime-400 h-80 md:h-26 absolute bottom-0 left-0 right-0 z-2 rounded-t-3xl"></div>
      </main>
      {/* Footer */}
      <footer className="bg-[#3A393E] text-lime-400 py-4 pl-2.5 text-left text-sm">
        <p>© 2025 Digital Money House</p>
      </footer>
    </div>
  );
};

export default Home;
