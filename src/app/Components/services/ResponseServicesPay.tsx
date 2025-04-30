"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface props{
  valor:number,
  name:string,
  fecha:string,
  card:number
} 

const ResponseServicesPay: React.FC<props> = ({valor,name,fecha,card}) => {
  const router = useRouter();



  return (
        <div
                style={{
                  backgroundColor: "#f0f0f0",
                  padding: "20px",
                  fontFamily: "sans-serif",
                }}
                className="min-h-screen flex flex-col items-center w-full"
              >
                <div className="h-40 flex flex-col items-center w-full  md:h-30 bg-[#C1FD35] p-4 rounded-md mb-8 mt-10">
                  <Image src={"/Check-black.png"} alt={"check"} width={50} height={50} />
                  <h2 className="font-bold mt-2 text-2xl ">Ya realizaste tu pago </h2>
                </div>
                <div className="flex flex-col bg-[#201F22] w-full h-fit p-6 rounded-md">
                  <div className="flex mt-4">
                    <p className="text-gray-400 mr-4 text-sm">{fecha} </p>
                  </div>
                  <h3 className="text-[#C1FD35]">${valor}</h3>
                  <div className="mt-4">
                    <p className="text-gray-400 text-sm">Para</p>
                    <h3 className="text-[#C1FD35]">{name}</h3>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-gray-400 mr-4">Tarjeta</h3>
                    <div className="flex justify-start">
                      <p className="text-gray-400 mr-4 text-xs">Nro:{card}</p>
                    </div>
                  </div>
                </div>
                <div className="flex w-full justify-end mt-4">
                    <button className="bg-[#CECECE] w-60 px-2 py-4 rounded-sm font-bold mr-4 cursor-pointer" onClick={()=>{router.push('/main/inicio')}}>Ir al incio</button>
                    <button className="bg-[#C1FD35] w-60 px-2 py-4 rounded-sm font-bold">Descargar Comprobante</button>
                </div>
              </div>
  );
};

export default ResponseServicesPay;
