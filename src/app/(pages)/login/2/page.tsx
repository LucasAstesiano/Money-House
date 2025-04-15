"use client";
import AuthServices from "@/app/api/auth/AuthServices";
import Header from "@/app/Components/Header";
import { useRouter,useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const LoginPage2: React.FC = () => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <LoginPage2Content />
    </React.Suspense>
  );
};

const LoginPage2Content: React.FC = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter()
  

const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setError("");
  setPassword(e.target.value);
};


  const handleContinue = async () => {
    try {
      const response = await AuthServices.login(email, password); 
      if (response?.token) {
        localStorage.setItem("token", response.token); 
        router.push("/main"); // Redirige al usuario después de iniciar sesión
      }
      else if (response.Status != 201){
        switch (response.error) {
          case "user not found": setError("El usuario ingresado no existe")
            break;
          case "invalid credentials": setError("Contraseña incorrecta, intenta nuevamente")
          break;
          default:setError("Ocurrio un error inesperado")
            break;
        }
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
      setPassword("")
      toast("Problemas al iniciar sesión", {
        description:
          err.message,
        action: {
          label: "OK",
          onClick: () => console.log("Error confirmado"),
        },
      });
    }
  };


  return (
    <div className="bg-[#3A393E] min-h-screen">
      <Header imgUrl="/Logo 02.png" color={"#C1FD35"} loginColor={""} singupColor={""} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        <h1 className="text-white mb-6">ingresa tu contraseña</h1>
        <div className="flex flex-col items-center">
          <input
            type="password"
            value={password}
            onChange={(e) => handlechange(e)}
            placeholder="Contraseña"
            className="bg-white rounded-md"
            style={{ marginBottom: "10px", padding: "10px", width: "300px" }}
          />
            <button
            onClick={() => {
              if (password.trim() === "") {
              setError("Este campo no puede estar vacío, Por favor ingresa la contraseña.");
              return;
              }
              handleContinue();
            }}
            className="bg-[#C1FD35] rounded-md"
            style={{ marginBottom: "10px", padding: "10px", width: "300px" }}
            >
            Continuar
            </button>
          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default LoginPage2;
