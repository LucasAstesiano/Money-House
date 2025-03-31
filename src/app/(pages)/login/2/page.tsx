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
  



  const handleContinue = async () => {
    try {
      const response = await AuthServices.login(email, password); // Cambia 'value' por la contraseña si es necesario
      if (response?.token) {
        localStorage.setItem("token", response.token); // Guarda el token en el localStorage
        // Guarda el token en el authContext        
        router.push("/main"); // Redirige al usuario después de iniciar sesión
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message); // Muestra el mensaje de error devuelto por la API
      setPassword("")
      toast("Problemas al iniciar sesión", {
        description:
          err.message === "invalid credentials"
            ? "Contraseña incorrecta"
            : err.message,
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
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="bg-white rounded-md"
            style={{ marginBottom: "10px", padding: "10px", width: "300px" }}
          />
          <button
            onClick={handleContinue}
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
