"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaPlus, FaArrowRight } from "react-icons/fa";
import AddCard from "./AddCard";
import { useRouter } from "next/navigation";
import { AccountServices } from "../api/account/AccountServices";
import { CardServices } from "../api/cards/CardServices";

const Cards: React.FC = () => {
  interface CardData {
    account_id: number;
    cod: number;
    expiration_date: string;
    first_last_name: string;
    id: number;
    number_id: number;
  }
  interface AccountData {
    alias: string;
    available_amount: 0;
    cvu: string;
    id: 0;
    user_id: 0;
  }

  const [cardData, setCardData] = useState<CardData[]>([]);
  const [accountData, setAccountData] = useState<AccountData | null>(null);

  useEffect(() => {
    CardServices.getCardData()
      .then((data) => {
        setCardData(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
    setCardData(cardData);

    AccountServices.getAccountData()
      .then((data) => {
        setAccountData(data);
      })
      .catch((error) => {
        console.error("Error fetching account data:", error);
      });
    setAccountData(accountData);
  }, []);

  const router = useRouter();

  const agregarParametro = (item: { value: string }) => {
    router.push(`/main/cards/${item.value}`);
  };
  const [showAddCard, setshowAddCard] = useState(false);

  const handleDelete = (id:number)=>{
    CardServices.deleteCard(id);
    CardServices.getCardData()
      .then((data) => {
        setCardData(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
    setCardData(cardData);
  }

  return (
    <>
      {showAddCard ? (
        <AddCard />
      ) : (
        <div
          style={{
            backgroundColor: "#f0f0f0",
            padding: "20px",
            fontFamily: "sans-serif",
          }}
          className="min-h-screen flex justify-center w-full"
        >
          <div className="w-[90%]">
            <div
              style={{
                backgroundColor: "#3A393E",
                borderRadius: "10px",
                color: "#fff",
              }}
              className="flex justify-between p-10"
            >
              <div>
                <h2>Agregá tu tarjeta de débito o crédito</h2>
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
                    agregarParametro({ value: "addCard" });
                  }}
                >
                  <FaPlus style={{ marginRight: "5px" }} />
                  Nueva tarjeta
                </button>
              </div>
              <div className="flex items-end">
                <FaArrowRight
                  style={{ color: "#C1FD35", marginTop: "10px" }}
                  size={25}
                />
              </div>
            </div>
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
                        terminada en {card.number_id.toString().slice(-4)}
                      </span>
                    </div>
                    <button
                      className="font-bold text-black hover:text-red-600"
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        cursor: "pointer",
                      }}
                      onClick={()=>handleDelete(card.id)}
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cards;
