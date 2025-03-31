'use client'
import { CardServices } from '@/app/api/cards/CardServices';
import { ServiceServices } from '@/app/api/service/ServiceServices';
import CardType from '@/app/interfaces/CardType';
import ServicesResponse from '@/app/interfaces/ServicesType';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
interface props{
    serviceId:number
}
const ServicesConfirmPay: React.FC<props> = ({serviceId}) => {
    const router = useRouter();
    const [data, setData] = useState<ServicesResponse>();

    useEffect(() => {
      ServiceServices.getServiceById(serviceId).then((data2) =>
        setData(data2)
      );
      setData(data);
    }, []);
  
    const [cardData, setCardData] = useState<CardType[]>([]);
  
    useEffect(() => {
      CardServices.getCardData()
        .then((data) => {
          setCardData(data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
      setCardData(cardData);
    }, []);
  
  
    return (
        <div
          style={{
            backgroundColor: "#f0f0f0",
            padding: "20px",
            fontFamily: "sans-serif",
          }}
          className="min-h-screen flex flex-col justify-center w-full"
        >
          <div className="flex flex-col bg-[#201F22] w-full h-fit p-6 rounded-md">
            <div className="flex justify-between pb-4 border-b-1 border-gray-600">
              <h3 className="text-[#C1FD35] font-bold">{data?.name}</h3>
              <p className="text-gray-400 text-sm underline cursor-pointer" onClick={()=>router.back()}>
                Ver detalle del pago
              </p>
            </div>
            <div className="flex mt-4 flex justify-between">
              <h3 className="text-white font-semibold">Total a pagar</h3>
              <h3 className="text-white ">$ {data?.invoice_value}</h3>
            </div>
          </div>
          <div className="bg-black w-full mt-4 p-8 rounded-md">
            <h1 className="text-[#C1FD35]">Seleciona tu tarjeta</h1>
            <div
              style={{
                backgroundColor: "#fff",
                borderRadius: "10px",
                padding: "20px",
                marginTop: "20px",
              }}
            >
              <h2 style={{ fontWeight: "bold" }}>Tus tarjetas</h2>
              <ul>
                {cardData.map((card) => (
                  <li
                    key={card.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    className="border-b-1 border-black py-8"
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Image
                        src={"/Ellipse 7.png"}
                        alt={"Elipse"}
                        width={25}
                        height={25}
                      />
                      <span className="ml-2">
                        {`Terminada en ${card.number_id.toString().slice(-4)}`}
                      </span>
                    </div>
                    <button
                      style={{
                        color: "black",
                        backgroundColor: "transparent",
                        border: "none",
                        cursor: "pointer",
                      }}
                      className="rounded-full border-e-amber-400"
                      onClick={() => {
                        /* setItem(card) */;
                      }}
                    >
                      <input
                        type="radio"
                        name="cardSelection"
                        style={{ accentColor: "black" }}
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
    );
  };

export default ServicesConfirmPay;