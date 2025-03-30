"use client";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

const InsertMoneyCard: React.FC = () => {
  const cards = [
    { id: 1, lastFourDigits: "1234" },
    { id: 2, lastFourDigits: "5678" },
    { id: 3, lastFourDigits: "1235" },
    { id: 4, lastFourDigits: "5673" },
  ];

  const router = useRouter();

  const [item, setItem] = useState(cards[0]);

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
            {cards.map((card) => (
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
                    Terminada en {card.lastFourDigits}
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
          <Link href={`/main/insertMoney/card/${item.id}`}>
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
