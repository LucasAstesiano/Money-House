"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { UserServices } from "../api/user/UserServices";
import { AccountServices } from "../api/account/AccountServices";
import AccountDataType from "../interfaces/AccountType";
import UserType from "../interfaces/UserType";
import imagenes from "../utils/imagenes";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import CopyToClipboard from "react-copy-to-clipboard";

const Profile: React.FC = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<UserType | null>(null);
  const [accountData, setAccountData] = useState<AccountDataType | null>(null);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editedValue, setEditedValue] = useState<string>("");

  useEffect(() => {
    UserServices.getUserData()
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });

    AccountServices.getAccountData()
      .then((data) => {
        setAccountData(data);
        console.log("Account data:", data);
      })
      .catch((error) => {
        console.error("Error fetching account data:", error);
      });
  }, []);

  const handleEditClick = (field: string, currentValue: string | undefined) => {
    setEditingField(field);
    setEditedValue(currentValue ?? "");
  };

  const handleSave = async () => {
    if (!editingField) return;

    try {
      if (editingField === "email" || editingField === "firstname" || editingField === "lastname" || editingField === "phone") {
        const updatedUserData:UserType = { ...userData, [editingField]: editedValue };
        await UserServices.updateUserData(updatedUserData); // Asegúrate de tener este método en tu servicio
        setUserData(updatedUserData);
      }
      toast.success("Datos actualizados correctamente");
    } catch (error) {
      console.error("Error al actualizar los datos:", error);
      toast.error("Error al actualizar los datos");
    } finally {
      setEditingField(null);
      setEditedValue("");
    }
  };

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
    <div className=" bg-gray-100 min-h-screen p-8 w-full">
      <div
        className="bg-white p-4 rounded-lg mb-6 "
        style={{ boxShadow: "2px 2px 6px 2px #D3D3D3" }}
      >
        <h2 className="text-xl font-bold mb-4">Tus datos</h2>
        <ul>
          {[
            { label: "Email", field: "email", value: userData?.email },
            { label: "Nombre y apellido", field: "firstname", value: `${userData?.firstname} ${userData?.lastname}` },
            { label: "CUIT", field: "dni", value: `20${userData?.dni}` },
            { label: "Teléfono", field: "phone", value: userData?.phone ?? "0000000" },
            {label: "contraseña", field: "password", value: userData?.password ?? "********" },
          ].map(({ label, field, value }) => (
            <li
              key={field}
              className="flex justify-between items-center mb-2 border-b-1 border-gray-300 p-2"
            >
              <div className="md:flex justify-between w-1/2">
                <p>{label}: </p>
                {editingField === field ? (
                  <input
                    type="text"
                    value={editedValue}
                    onChange={(e) => setEditedValue(e.target.value)}
                    className="text-gray-500 md:w-1/2 text-center border rounded px-2"
                  />
                ) : (
                  <p className="text-gray-500 md:w-1/2 text-center">{value}</p>
                )}
              </div>
              {editingField === field ? (
                <button
                  className="text-green-500"
                  onClick={handleSave}
                >
                  Guardar
                </button>
              ) : (
                <button
                  className="text-blue-500"
                  onClick={() => handleEditClick(field, value)}
                >
                  <Image
                    src={imagenes.editar}
                    alt={"icono-editar"}
                    width={20}
                    height={20}
                  />
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button
          className="flex justify-between  bg-[#C1FD35] text-black w-full font-bold py-6 px-4 rounded items-center my-4 cursor-pointer"
          style={{ boxShadow: "2px 2px 6px 2px #D3D3D3" }}
          onClick={() => router.push("/main/cards")}
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
        </div>
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-[#C1FD35]">Alias</h3>
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
        </div>
      </div>
    </div>
  );
};

export default Profile;
