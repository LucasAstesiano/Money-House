'use client'
import React from "react";
import { useRouter } from "next/navigation";
import HeaderPropsType from "../interfaces/HeaderType";
import Image from "next/image";
import Navbar from "./MenuDesplegable";


const Header: React.FC<HeaderPropsType> = ({color,showLoginButton = false,showSignupButton = false,loginColor="#C1FD35",singupColor="#3A393E",imgUrl="/logo 01.png",text}) => {

    const router = useRouter()

    const handleLoginClick = () => {
        router.push("/login");
    };

    const handleSignupClick = () => {
        router.push("/signup");
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
        {!showLoginButton && !showSignupButton && <Navbar/>}
    </div>
    </header>
);
};

export default Header;
