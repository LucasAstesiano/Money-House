'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Cerrar el menú si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && !(event.target as HTMLElement).closest("#menu")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  return (
    <nav className="p-4 md:hidden">
      <div className="container mx-auto flex justify-between items-center">
        {/* Botón del menú */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white md:hidden focus:outline-none"
        >
          {isOpen ? <FiX size={24} color="#C1FD35" /> : <FiMenu size={24}color="#C1FD35" />}
        </button>

        {/* Menú desplegable */}
        <div
          id="menu"
          className={`absolute top-16 right-4 bg-[#C1FD35] shadow-lg rounded-lg md:static md:bg-transparent md:flex md:gap-6 z-2 ${
            isOpen ? "block" : "hidden"
          }`}
        >
            <h3 className="bg-[#3A393E] text-white p-2 w-full">Menu</h3>
          <ul className="flex flex-col md:flex-row md:items-center">
            <li>
              <Link href="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-200 md:text-white md:hover:bg-transparent">
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/main/actividad" className="block px-4 py-2 text-gray-700 hover:bg-gray-200 md:text-white md:hover:bg-transparent">
                Actividad
              </Link>
            </li>
            <li>
              <Link href="/main/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-200 md:text-white md:hover:bg-transparent">
                Tu perfil
              </Link>
            </li>
            <li>
              <Link href="/main/insertMoney" className="block px-4 py-2 text-gray-700 hover:bg-gray-200 md:text-white md:hover:bg-transparent">
                Cargar dinero
              </Link>
            </li>
            <li>
              <Link href="/main/services" className="block px-4 py-2 text-gray-700 hover:bg-gray-200 md:text-white md:hover:bg-transparent">
                Pagar servicios
              </Link>
            </li>
            <li>
              <Link href="/main/cards" className="block px-4 py-2 text-gray-700 hover:bg-gray-200 md:text-white md:hover:bg-transparent">
                Tarjetas
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
