"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { UserServices } from "../api/user/UserServices";
import { AccountServices } from "../api/account/AccountServices";
import AccountDataType from "../interfaces/AccountType";
import UserType from "../interfaces/UserType";
import imagenes from "../utils/imagenes";

const Profile: React.FC = () => {
  
  const [userData, setUserData] = useState<UserType | null>(null);
  const [accountData, setAccountData] = useState<AccountDataType | null>(null);
  
  useEffect(() => {
    UserServices.getUserData()
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
    setUserData(userData);

    AccountServices.getAccountData()
      .then((data) => {
        setAccountData(data)
        console.log("Account data:", data);
      })
      .catch((error) => {
        console.error("Error fetching account data:", error);
      });
      setAccountData(accountData)
  }, []);

  return (
    <div className=" bg-gray-100 min-h-screen p-8 w-full">
      <div
        className="bg-white p-4 rounded-lg mb-6 "
        style={{ boxShadow: "2px 2px 6px 2px #D3D3D3" }}
      >
        <h2 className="text-xl font-bold mb-4">Tus datos</h2>
        <ul>
          <li className="flex justify-between items-center mb-2 border-b-1 border-gray-300 p-2 ">
          <div className=" md:flex justify-between w-1/2 ">
              <p >Email: </p>
              <p className="text-gray-500 md:w-1/2 text-center">{userData?.email}</p>
            </div>
            <button className="text-blue-500">
              <Image
                src={imagenes.editar}
                alt={"icono-editar"}
                width={20}
                height={20}
              />
            </button>
          </li>
          <li className="flex justify-between items-center mb-2 border-b-1 border-gray-300 p-2">
            <div className="md:flex justify-between w-1/2 ">
              <p>Nombre y apellido: </p>
              <p className="text-gray-500 md:w-1/2 text-center">
                {userData?.firstname + " " + userData?.lastname}
              </p>
            </div>
            <button className="text-blue-500">
              <Image
                src={imagenes.editar}
                alt={"icono-editar"}
                width={20}
                height={20}
              />
            </button>
          </li>
          <li className="flex justify-between items-center mb-2 border-b-1 border-gray-300 p-2">
            <div className="md:flex justify-between w-1/2 ">
              <p>CUIT: </p>
              <p className="text-gray-500  md:pw-1/2 text-center">20{userData?.dni}8</p>
            </div>
            <button className="text-blue-500">
              <Image
                src={imagenes.editar}
                alt={"icono-editar"}
                width={20}
                height={20}
              />
            </button>
          </li>
          <li className="flex justify-between items-center mb-2 border-b-1 border-gray-300 p-2">
            <div className="md:flex justify-between w-1/2 ">
              <p>Teléfono: </p>
              <p className="text-gray-500  md:w-1/2 text-center">{userData?.phone ?? '0000000'}</p>
            </div>
            <button className="text-blue-500">
              <Image
                src={imagenes.editar}
                alt={"icono-editar"}
                width={20}
                height={20}
              />
            </button>
          </li>
          <li className="flex justify-between items-center mb-2 border-b-1 border-gray-300 p-2">
            <div className="md:flex justify-between w-1/2 ">
              <p>Contraseña: </p>
              <p className="text-gray-500  md:w-1/2 text-center"> ******* </p>
            </div>
            <button className="text-blue-500">
              <Image
                src={imagenes.editar}
                alt={"icono-editar"}
                width={20}
                height={20}
              />
            </button>
          </li>
        </ul>
      </div>
      <div>
        <button
          className="flex justify-between  bg-[#C1FD35] text-black w-full font-bold py-6 px-4 rounded items-center my-4"
          style={{ boxShadow: "2px 2px 6px 2px #D3D3D3" }}
        >
          <p>Gestioná los medios de pago</p>
          <span className="ml-2 ">→</span>
        </button>
      </div>
      <div
        className="bg-black p-4 rounded-lg"
        style={{ boxShadow: "2px 2px 6px 2px #D3D3D3" }}
      >
        <p className="text-white mb-4">
          Copia tu CVU o alias para ingresar o transferir dinero desde otra
          cuenta
        </p>
        <div className="flex justify-between items-center mb-4 pb-2 border-b md:border-none">
          <div>
            <h3 className="text-[#C1FD35]">CVU</h3>
            <p className="text-gray-300">{accountData?.cvu}</p>
          </div>
          <button className="text-blue-500">
            <Image
              src={"/icon agregar.png"}
              alt={"icono-editar"}
              width={30}
              height={30}
            />
          </button>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-[#C1FD35]">Alias</h3>
            <p className="text-gray-300">{accountData?.alias}</p>
          </div>
          <button className="text-blue-500">
            <Image
              src={"/icon agregar.png"}
              alt={"icono-editar"}
              width={30}
              height={30}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
