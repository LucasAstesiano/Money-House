"use client";
import MainLayout from "@/app/Components/MainLayout";
import servicesList from "@/app/utils/servicesList";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";


const Page = ({ params }: { params: { id: string } }) => {
  const [money, setMoney] = useState();
  const id = params.id
  const router = useRouter();
  useEffect(() => {
    findServices();
  }, []);

  const service = findServices();

  if (!service) {
    router.push('/main/services'); // Redirect if service not found
    return null;
  }
  function findServices(){
    const service = servicesList.find((service) => service.id === parseInt(params.id));
    return service;
  }

  const handleChange = (e: any) => {
    setMoney(e.target.value);
  };
  const handleclick = () => {
    router.push(`/main/services/${id}/confirm`);
  }

  return (
    <MainLayout>
      <div
        style={{
          backgroundColor: "#f0f0f0",
          padding: "20px",
          fontFamily: "sans-serif",
        }}
        className="min-h-screen flex justify-center w-full"
      >
        <div className="flex flex-col bg-[#201F22] w-full h-fit p-6 rounded-md ">
          <h3 className="text-[#C1FD35]">
            Número de cuenta sin el primer 2
          </h3>
          <input
            type="text "
            value={ service.accountNumber}
            className="rounded-sm p-2 bg-white mt-4 w-50"
            placeholder="37289701912"
            onChange={(e) => handleChange(e)}
          />
          <p className="text-gray-400 text-xs mt-4">Son 11 números sin espacios, sin el “2” inicial. Agregá ceros adelante si tenés menos. </p>
          <button
            className={`self-end w-fit px-6 py-2 rounded-md mt-4 bg-[#C1FD35] cursor-pointer`}
            onClick={() => handleclick()}
          >
            Continuar
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Page;
