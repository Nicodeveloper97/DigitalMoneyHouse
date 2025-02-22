"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Swal from 'sweetalert2';

const Navbar = () => {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Quieres cerrar sesión?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      localStorage.removeItem("token");
      sessionStorage.removeItem("email"); 
      setIsLoggedIn(false);
      window.location.replace("/");
    }
  };

  const bgColor = pathname === "/login" || pathname === "/login-password" || pathname === "/sign-up" ? "bg-lime-500" : "bg-black";
  const logo = pathname === "/login" || pathname === "/login-password" || pathname === "/sign-up" ? "/assets/logo-black.png" : "/assets/logo.png";

  return (
    <div className={`${bgColor} h-16 w-full flex justify-between items-center px-4`}>
      <div className="text-white font-bold">
        <Link href="/">
          <img src={logo} alt="Logo" 
            className="h-7 w-auto mr-4 pl-0 sm:pl-0" />
        </Link>
      </div>
      {!isLoggedIn ? (
        pathname !== "/login" && pathname !== "/login-password" && pathname !== "/sign-up" && (
          <div className="flex space-x-4">
            <Link href="/login">
              <div className="bg-black text-lime-500 px-4 py-2 rounded border border-lime-500 font-bold">
                Ingresar
              </div>
            </Link>
            <Link href="/sign-up">
              <button className="bg-lime-500 text-black px-4 py-2 rounded font-bold">
                Crear cuenta
              </button>
            </Link>
          </div>
        )
      ) : (
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded font-bold">
          Cerrar sesión
        </button>
      )}
    </div>
  );
};

export default Navbar;