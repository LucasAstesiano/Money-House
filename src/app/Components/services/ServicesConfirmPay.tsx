"use client";
import { CardServices } from "@/app/api/cards/CardServices";
import { ServiceServices } from "@/app/api/service/ServiceServices";
import CardType from "@/app/interfaces/CardType";
import ServicesResponse from "@/app/interfaces/ServicesType";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { transactionServices } from "@/app/api/transaction/transactionServices";
interface props {
  serviceId: number;
}
const ServicesConfirmPay: React.FC<props> = ({ serviceId }) => {

  const router = useRouter();
  const [data, setData] = useState<ServicesResponse>();
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [show,setShow] = useState(false)

  useEffect(() => {
    ServiceServices.getServiceById(serviceId).then((data2) => setData(data2));
    setData(data);
  }, []);

  const [cardData, setCardData] = useState<CardType[]>([]);

  useEffect(() => {
    CardServices.getCardData()
      .then((data) => {
        setCardData(data);
        console.log("Card data:", data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
    setCardData(cardData);
  }, []);

  const handleclick = () => {
    transactionServices.payServices({
      amount: -(data?.invoice_value ?? 0),
      description: `Pago de ${data?.name}`,
      dated: new Date().toISOString(),
    })
    setShow(true)
    }


  return (
    <>
      {show == false ? (
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
              <p
                className="text-gray-400 text-sm underline cursor-pointer"
                onClick={() => router.back()}
              >
                Ver detalle del pago
              </p>
            </div>
            <div className="flex mt-4 justify-between">
              <h3 className="text-white font-semibold">Total a pagar</h3>
              <h3 className="text-white ">$ {data?.invoice_value}</h3>
            </div>
          </div>
          <div className="bg w-full mt-4 p-8 rounded-md">
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
                        setSelectedCard(card.number_id);
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
            <div className="w-full flex justify-end mt-4">
              <button
                className="bg-[#C1FD35] px-6 py-2 rounded-lg font-bold cursor-pointer"
                style={{ boxShadow: "2px 2px 2px 2px #e6e6e6" }}
                onClick={handleclick}
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            backgroundColor: "#f0f0f0",
            padding: "20px",
            fontFamily: "sans-serif",
          }}
          className="min-h-screen flex flex-col items-center w-full"
        >
          <div className="h-40 flex flex-col items-center w-full  md:h-30 bg-[#C1FD35] p-4 rounded-md mb-8 mt-10">
            <Image
              src={"/Check-black.png"}
              alt={"check"}
              width={50}
              height={50}
            />
            <h2 className="font-bold mt-2 text-2xl ">Ya realizaste tu pago </h2>
          </div>
          <div className="flex flex-col bg-[#201F22] w-full h-fit p-6 rounded-md">
            <div className="flex mt-4">
              <p className="text-gray-400 mr-4 text-sm">{new Date().toISOString()} </p>
            </div>
            <h3 className="text-[#C1FD35]">${data?.invoice_value}</h3>
            <div className="mt-4">
              <p className="text-gray-400 text-sm">Para</p>
              <h3 className="text-[#C1FD35]">{data?.name}</h3>
            </div>
            <div className="mt-4">
              <h3 className="text-gray-400 mr-4">Tarjeta</h3>
              <div className="flex justify-start">
                <p className="text-gray-400 mr-4 text-xs">{selectedCard?.toString().startsWith("4545") ? "Visa" : "Mastercard"} {selectedCard}</p>
              </div>
            </div>
          </div>
          <div className="flex w-full justify-end mt-4">
            <button
              className="bg-[#CECECE] w-60 px-2 py-4 rounded-sm font-bold mr-4 cursor-pointer"
              onClick={() => {
                router.push("/main/inicio");
              }}
            >
              Ir al incio
            </button>
            <button className="bg-[#C1FD35] w-60 px-2 py-4 rounded-sm font-bold">
              Descargar Comprobante
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ServicesConfirmPay;
