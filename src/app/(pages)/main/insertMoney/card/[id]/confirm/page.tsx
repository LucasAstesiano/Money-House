"use client";
import MainLayout from "@/app/Components/MainLayout";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

const ConfirmPage = ({ params }: { params: { id: string } }) => {
  const searchParams = useSearchParams();
  const money = searchParams.get("money");
  const router = useRouter();
  const [confirm, setConfirm] = useState(false);

  const handleClick = () => {
    setConfirm(true);
  };

  return (
    <MainLayout>
      {!confirm ?
        <div
          style={{
            backgroundColor: "#f0f0f0",
            padding: "20px",
            fontFamily: "sans-serif",
          }}
          className="min-h-screen flex justify-center w-full"
        >
          <div className="flex flex-col bg-[#201F22] w-full h-fit p-6 rounded-md">
            <h3 className="text-[#C1FD35] font-bold">
              Revisá que todo este bien
            </h3>
            <div className="flex mt-4">
              <p className="text-gray-400 mr-4 text-sm">Vas a transferir </p>
              <Image
                src={"/clarity_note-edit-line.png"}
                alt={""}
                width={20}
                height={20}
                className="cursor-pointer"
                onClick={() => {
                  router.back();
                }}
              />
            </div>
            <h3 className="text-white">${money}</h3>
            <div className="mt-4">
              <p className="text-gray-400 text-sm">Para</p>
              <h3 className="text-white">Cuenta propia</h3>
            </div>
            <div className="mt-4">
              <h3 className="text-gray-400 mr-4">Brubank</h3>
              <div className="flex justify-between">
                <p className="text-gray-400 mr-4 text-xs">
                  cvu: 000000006443516
                </p>
                <button
                  className="w-fit px-12 py-2 rounded-md bg-[#C1FD35] cursor-pointer"
                  onClick={() => handleClick()}
                >
                  Continuar
                </button>
              </div>
            </div>
          </div>
        </div>
        :
        <div
                style={{
                  backgroundColor: "#f0f0f0",
                  padding: "20px",
                  fontFamily: "sans-serif",
                }}
                className="min-h-screen flex flex-col items-center w-full"
              >
                <div className="flex flex-col items-center w-full  h-30 bg-[#C1FD35] p-4 rounded-md mb-8 mt-10">
                  <Image src={"/check-black.png"} alt={"check"} width={50} height={50} />
                  <h2 className="font-bold mt-2 text-2xl ">Ya cargamos el dinero en tu cuenta</h2>
                </div>
                <div className="flex flex-col bg-[#201F22] w-full h-fit p-6 rounded-md">
                  <div className="flex mt-4">
                    <p className="text-gray-400 mr-4 text-sm">17 de marzo 2025 a 14:25 </p>
                  </div>
                  <h3 className="text-[#C1FD35]">${money}</h3>
                  <div className="mt-4">
                    <p className="text-gray-400 text-sm">Para</p>
                    <h3 className="text-[#C1FD35]">Cuenta propia</h3>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-gray-400 mr-4">Brubank</h3>
                    <div className="flex justify-start">
                      <p className="text-gray-400 mr-4 text-xs">cvu: 000000006443516</p>
                    </div>
                  </div>
                </div>
                <div className="flex w-full justify-end mt-4">
                    <button className="bg-[#CECECE] w-60 px-2 py-4 rounded-sm font-bold mr-4 cursor-pointer" onClick={()=>{router.push('/main/inicio')}}>Ir al incio</button>
                    <button className="bg-[#C1FD35] w-60 px-2 py-4 rounded-sm font-bold">Descargar Comprobante</button>
                </div>
              </div>
      }
    </MainLayout>
  );
};

export default ConfirmPage;
