'use client'
import { AccountServices } from "@/app/api/account/AccountServices";
import { useDataContext } from "@/app/context/DataContext";
import Image from "next/image";
import React, { useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "sonner";

const InsertMoneyTransf: React.FC = () => {

  const {setAccountData,accountData} = useDataContext();
      
        useEffect(() => {
          AccountServices.getAccountData().then((response) => {
            setAccountData(response);  
          })
        }
        , []);


  const handleCopy = (message: string) => {
    toast(message, {
      description: "El contenido ha sido copiado al portapapeles.",
      action: {
        label: "OK",
        onClick: () => console.log("copiado"),
      },
    });
  };

  return (
      <section className="min-h-screen bg-gray-100 w-full">
        <div className="bg-[#3A393E] mt-8 m-4 p-6 rounded-md text-white ">
          <p className="mt-2">
            Copia tu cvu o alias para ingresar o transferir dinero desde otra
            cuenta
          </p>
          <ul>
            <li className="flex justify-between my-4">
              <div>
                <h3 className="text-[#C1FD35]">CVU</h3>
                <p className="text-gray-300">{accountData?.cvu}</p>
              </div>
              <CopyToClipboard text={accountData?.cvu.toString() ?? ""}>
                <button
                  className="cursor-pointer"
                  onClick={() => handleCopy("CVU copiado")}
                >
                  <Image
                    src="/icon agregar.png"
                    alt="Description of the image"
                    width={30}
                    height={30}
                  />
                </button>
              </CopyToClipboard>
            </li>
            <li className="flex justify-between">
              <div>
                <h3 className="text-[#C1FD35]">alias</h3>
                <p className="text-gray-300">{accountData?.alias}</p>
              </div>
              <CopyToClipboard text={accountData?.alias.toString() ?? ""}>
                <button
                  className="cursor-pointer"
                  onClick={() => handleCopy("Alias copiado")}
                >
                  <Image
                    src="/icon agregar.png"
                    alt="Description of the image"
                    width={30}
                    height={30}
                  />
                </button>
              </CopyToClipboard>
            </li>
          </ul>
        </div>
      </section>
  );
};

export default InsertMoneyTransf;
