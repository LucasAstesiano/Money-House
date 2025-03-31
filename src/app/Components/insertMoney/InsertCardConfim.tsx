'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface props{
    id:string
}
const InsertCardConfirm: React.FC<props> = ({id}) => {
    {
        const [money, setMoney] = useState<string | number>("");
        const isDisabled = money === 0 || money === undefined;
        const router = useRouter();
      
        const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
          setMoney(e.target.value);
        };
        const handleclick = () => {
          router.push(`/main/insertMoney/card/${ id }/confirm?money=${money}`);
        }
      
        return (
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
                  ¿Cúanto querés ingresar a la cuenta?
                </h3>
                <input
                  type="text"
                  value={ money}
                  className="rounded-sm p-2 bg-white mt-4 w-50"
                  placeholder="$"
                  onChange={(e) => handleChange(e)}
                />
                <button
                  className={`self-end w-fit px-6 py-2 rounded-md mt-4 ${
                    money == 0 || money == undefined
                      ? "bg-[#CECECE] cursor-not-allowed"
                      : "bg-[#C1FD35] cursor-pointer"
                  }`}
                  onClick={() => handleclick()}
                  disabled={isDisabled}
                >
                  Continuar
                </button>
              </div>
            </div>
        );
      };
};

export default InsertCardConfirm;