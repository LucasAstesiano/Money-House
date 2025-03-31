"use client";
import Header from "@/app/Components/Header";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AuthServices from "@/app/api/auth/AuthServices";
import { toast } from "sonner";

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

  const handleContinue = async () => {
    router.push(`/login/2?email=${encodeURIComponent(email)}`);
    try {
      await AuthServices.login(email, "value"); // Cambia 'value' por la contraseña si es necesario
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // Verifica si el error tiene una respuesta
      if (err.response && err.response.data) {
        // Extrae el mensaje de error desde la respuesta
        const errorMessage = err.response.data.error;
  
        // Maneja el caso específico de "invalid credentials"
        if (errorMessage === "invalid credentials") {
          setError(""); // Limpia cualquier error previo
          router.push(`/login/2?email=${encodeURIComponent(email)}`); // Redirige a la segunda página
        } else {
          // Si el error no es "invalid credentials", muestra el mensaje de error
          setError(errorMessage); // Muestra el mensaje de error devuelto por la API
          toast("Problemas al iniciar sesión", {
            description:
              errorMessage === "user not found"
                ? "El usuario no existe"
                : errorMessage,
            action: {
              label: "OK",
              onClick: () => console.log("Error confirmado"),
            },
          });
        }
      } else {
        // Si no hay respuesta de error esperada, manejar otros casos
        setError(err.message || "Error desconocido");
        toast("Problemas al iniciar sesión", {
          description: err.message || "Error desconocido",
          action: {
            label: "OK",
            onClick: () => console.log("Error confirmado"),
          },
        });
      }
    }
  };
  
  const handleSignupClick = () => {
    router.push("/signup");
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
