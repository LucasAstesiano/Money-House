"use client";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CardType from "@/app/interfaces/CardType";
import AccountDataType from "@/app/interfaces/AccountType";
import { CardServices } from "@/app/api/cards/CardServices";
import { AccountServices } from "@/app/api/account/AccountServices";

const InsertMoneyCard: React.FC = () => {
  const router = useRouter();
  const [item, setItem] = useState<CardType | null>(null);
  const [cardData, setCardData] = useState<CardType[]>([]);
  const [accountData, setAccountData] = useState<AccountDataType | null>(null);

  useEffect(() => {
  // Obtener los datos de las tarjetas
  CardServices.getCardData()
    .then((data: CardType[]) => {
      // Aquí se asegura que data sea un array de CardType
      if (data && data.length > 0) {
        setCardData(data); // Asignar los datos a cardData
        setItem(data[0]); // Asignar el primer elemento al item
      }
    })
    .catch((error) => {
      console.error("Error fetching card data:", error);
    });

  // Obtener los datos de la cuenta
  AccountServices.getAccountData()
    .then((data: AccountDataType | null) => {
      setAccountData(data); // Asignar los datos de la cuenta
      console.log(accountData);
      
    })
    .catch((error) => {
      console.error("Error fetching account data:", error);
    });
}, []);

  const agregarParametro = (value: string) => {
    router.push(`/main/cards/${value}`);
  };

  return (
    <div
      style={{
        backgroundColor: "#f0f0f0",
        padding: "20px",
        fontFamily: "sans-serif",
      }}
      className="min-h-screen flex justify-center w-full"
    >
      <div className="bg-black w-full m-4 p-8 rounded-md">
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
                key={card.number_id}
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
                    Terminada en {card.number_id.toString().slice(-4)}
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
                    setItem(card);
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
        <div className="flex justify-between mt-4">
          <button
            className="mt-4"
            style={{
              display: "flex",
              alignItems: "center",
              color: "#C1FD35",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => {
              agregarParametro("addCard");
            }}
          >
            <FaPlus style={{ marginRight: "5px" }} />
            Nueva tarjeta
          </button>
          <Link href={`/main/insertMoney/card/${item?.account_id}`}>
            <button className="text-black bg-[#C1FD35] rounded-md py-2 px-6 cursor-pointer">
              Continuar
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InsertMoneyCard;
