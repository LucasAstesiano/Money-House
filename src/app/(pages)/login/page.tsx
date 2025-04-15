"use client";
import Header from "@/app/Components/Header";
import React, { useState } from "react";
import { useRouter } from "next/navigation";


const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/main");
    }
    
  }, []);

  React.useEffect(() => {
    console.log("Current email value:", email);
  }, [email]);
  
  const handleSignupClick = () => {
    router.push("/signup");
  };

  const handleContinue = async () => {
    if (!email) {
      setError("Este campo no puede estar vacío, Por favor ingresa un correo electrónico.");
      return;
    }
    if (!email.includes("@")) {
      setError("Por favor, ingresa un correo electrónico válido.");
      return;
    }
    setError(""); // Clear any previous error
    router.push(`/login/2?email=${encodeURIComponent(email)}`);
  };

  return (
    <div className="bg-[#3A393E] min-h-screen">
      <Header
        imgUrl="/Logo 02.png"
        color={"#C1FD35"}
        loginColor={""}
        singupColor={""}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        <h1 className="text-white mb-6 mt-20">Hola, ingresa tu mail</h1>
        <div className="flex flex-col items-center text-black">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electronico"
            className="bg-white rounded-md"
            style={{ marginBottom: "10px", padding: "10px", width: "300px" }}
          />
          <button
            onClick={handleContinue}
            className="bg-[#C1FD35] rounded-md cursor-pointer"
            style={{ marginBottom: "10px", padding: "10px", width: "300px" }}
          >
            Continuar
          </button>
          <button
            onClick={handleSignupClick}
            className="bg-[#bebec1] rounded-md cursor-pointer"
            style={{ padding: "10px", width: "300px" }}
          >
            Crear cuenta
          </button>
          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
