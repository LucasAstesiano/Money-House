'use client'
import React from "react";
import { useRouter } from "next/navigation";
import HeaderPropsType from "../interfaces/HeaderType";
import Image from "next/image";


const Header: React.FC<HeaderPropsType> = ({color,showLoginButton = false,showSignupButton = false,loginColor="#C1FD35",singupColor="#3A393E",imgUrl="/logo 01.png"}) => {

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
        <Image height={30} width={50} src={imgUrl} alt="Logo" style={{ height: "30px" }} />
    </div>
    <div>
        {showLoginButton && (
        <button onClick={handleLoginClick} className="cursor-pointer" style={{ marginRight: "10px", backgroundColor:loginColor, color:singupColor, padding:"4px 8px", border:"1px solid", borderRadius:"6px" }}>Ingresar</button>
        )}
        {showSignupButton && <button onClick={handleSignupClick} className="cursor-pointer" style={{backgroundColor:singupColor , color:loginColor,border:"1px solid", padding:"4px 8px", borderRadius:"6px"}}>Crear Cuenta</button>}
    </div>
    </header>
);
};

export default Header;
