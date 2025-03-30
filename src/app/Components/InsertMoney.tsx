"use client";
import React from "react";
import { useRouter } from "next/navigation";

const InsertMoney: React.FC = () => {
  const router = useRouter();

  const agregarParametro = (value: string) => {
    router.push(`/main/insertMoney/${value}`);
  };

  return (
    <div className="flex flex-col items-center w-full p-12">
      <button
        onClick={() => {
          agregarParametro("transf");
        }}
        className="w-full cursor-pointer bg-[#201F22] text-[#C1FD35] my-2 py-4 text-lg hover:bg-[#3B393E] rounded-md text-start p-2"
        style={{boxShadow: '2px 2px 2px 2px #D3D3D3'}}
      >
        Transferencia Bancaria
      </button>
      <button
        onClick={() => {
          agregarParametro("card");
        }}
        className="w-full cursor-pointer bg-[#201F22] text-[#C1FD35] my-2 py-4 text-lg hover:bg-[#3B393E]  rounded-md text-start p-2"
        style={{boxShadow: '2px 2px 2px 2px #D3D3D3'}}
      >
        Seleccionar Tarjetas
      </button>
    </div>
  );
};

export default InsertMoney;
