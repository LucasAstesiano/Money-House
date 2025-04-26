'use client'
import React from "react";
import { useRouter } from "next/navigation";
import HeaderPropsType from "../interfaces/HeaderType";
import Image from "next/image";
import Navbar from "./MenuDesplegable";


const Header: React.FC<HeaderPropsType> = ({color,showLoginButton = false,showSignupButton = false,loginColor="#C1FD35",singupColor="#3A393E",imgUrl="/logo 01.png",text,name}) => {

    const router = useRouter()

    const handleLoginClick = () => {
        router.push("/login");
    };

    const handleSignupClick = () => {
        router.push("/signup");
    };
    const handleInicioClick = () => {
        router.push("");
    };
    const handleLogoClick = () => {
        router.push("/home");
    };

return (
    <header
    className="h-20"
    style={{
        backgroundColor: color,
        padding: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    }}
    >
    <div onClick={handleLogoClick} className="cursor-pointer">
        <Image height={30} width={60} src={imgUrl} alt="Logo" style={{ height: "30px" }} />
    </div>
    <div>
        {showLoginButton && (
        <button onClick={handleLoginClick} className={`cursor-pointer ${text ? "border-none":"border-1 border-[#C1FD35]"}`} style={{ marginRight: "10px", backgroundColor:loginColor, color:singupColor, padding:"5px 14px", borderRadius:"6px" }}>{text? text :"Ingresar"}</button>
        )}
        {showSignupButton && <button onClick={handleSignupClick} className="cursor-pointer font-bold" style={{backgroundColor:singupColor , color:loginColor,border:"1px solid", padding:"5px 14px", borderRadius:"6px"}}>Crear Cuenta</button>}
        {name &&
         <div className="flex">
            <button onClick={handleInicioClick} className={`cursor-pointer ${text ? "border-none":"border-1 border-[#C1FD35] font-bold"}`} style={{ marginRight: "10px", backgroundColor:"#C1FD35", color:singupColor, padding:"5px 14px", borderRadius:"6px" }}>{name.split(" ").map(word => word[0]).join("").toUpperCase()}</button>
             <p className="text-white text-sm self-center font-semibold"> Hola, {name}</p>
         </div>}
        {!showLoginButton && !showSignupButton && <Navbar/>}
    </div>
    </header>
);
};

export default Header;
