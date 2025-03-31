'use client'
import React, { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { CardServices } from "../api/cards/CardServices";

const AddCard: React.FC = () => {
  const [number_id, setNumberId] = useState("");
  const [first_last_name, setFirst_last_name] = useState("");
  const [expiration_date, setExpiration_date] = useState("");
  const [code, setCode] = useState("");
  const [focus, setFocus] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    CardServices.addCard({number_id: Number(number_id), first_last_name, expiration_date, code: Number(code), focus})
      .then(() => {
      console.log("Tarjeta creada exitosamente");
      window.location.href = "/main/cards";
      })
      .catch((error) => {
      console.error("Error al crear la tarjeta:", error);
      alert("Hubo un error al crear la tarjeta. Por favor, inténtalo de nuevo.");
      });
  };
  


  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 w-full">
      <div className="bg-white p-8 rounded-lg shadow-md w-full m-5">
        <Cards
          number={number_id}
          name={first_last_name}
          expiry={expiration_date}
          cvc={code}
          focused={focus}
        />
        <form className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="cardNumber"
            >
              Número de Tarjeta
            </label>
            <input
              type="text"
              id="cardNumber"
              className="p-2 rounded w-full focus:outline-none focus:shadow-outline"
              value={number_id}
              onChange={(e) => setNumberId(e.target.value)}
              onFocus={(e) => setFocus(e.target.name)}
              name="number"
              style={{boxShadow: '2px 2px 2px 2px #D3D3D3'}}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Nombre
            </label>
            <input
              type="text"
              id="name"
              className="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={first_last_name}
              onChange={(e) => setFirst_last_name(e.target.value)}
              onFocus={(e) => setFocus(e.target.name)}
              name="name"
              style={{boxShadow: '2px 2px 2px 2px #D3D3D3'}}

            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="expiry"
            >
              Fecha de Expiración
            </label>
            <input
              placeholder="xx/xxxx"
              type="text"
              id="expiry"
              className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={expiration_date}
              onChange={(e) => setExpiration_date(e.target.value)}
              onFocus={(e) => setFocus(e.target.name)}
              name="expiry"
              style={{boxShadow: '2px 2px 2px 2px #D3D3D3'}}

            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="cvc"
            >
              CVV
            </label>
            <input
              type="text"
              id="cvc"
              className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onFocus={(e) => setFocus(e.target.name)}
              name="cvc"
              style={{boxShadow: '2px 2px 2px 2px #D3D3D3'}}

            />
          </div>
          <div className="col-span-1 md:col-span-2 flex justify-end">
            <button
              type="submit"
              className={`${first_last_name && number_id && expiration_date && code ? 'bg-[#C1FD35]':'bg-[#CECECE]' } hover:bg-[#aad743] cursor-pointer text-black font-bold py-4 w-1/2 rounded focus:outline-none focus:shadow-outline`}
              onClick={(event)=>{handleSubmit(event)}}
            >
              Continuar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCard;
