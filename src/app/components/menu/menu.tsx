"use client";
import Link from "next/link";
import React from "react";
import Swal from "sweetalert2";
import { usePathname } from "next/navigation";

const Menu = () => {
  const pathname = usePathname();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      localStorage.removeItem("token");
      sessionStorage.removeItem("email");
      window.location.replace("/");
    }
  };

  const menuLinks = [
    { href: "/main/home", name: "Inicio" },
    { href: "/main/activity", name: "Actividad" },
    { href: "/main/account", name: "Tu perfil" },
    { href: "/main/transactions", name: "Cargar dinero" },
    { href: "/main/services", name: "Pagar servicios" },
    { href: "/main/card1", name: "Tarjetas" },
  ];

  return (
    <div className="hidden md:block w-[276px] min-h-screen bg-lime-500 text-black">
      <ul className="pl-10 py-10 space-y-4 w-full">
        {menuLinks.map((link, index) => {
          const isActive = pathname === link.href;
          return (
            <li
              className={`${
                isActive ? "font-bold" : "font-semibold"
              } text-total-black`}
              key={`option-menu-${index}`}>
              <Link href={link.href}>{link.name}</Link>
            </li>
          );
        })}
        <div className="mt-auto mb-4">
          <button
            className="text-total-black font-semibold"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </div>
      </ul>
    </div>
  );
};

export default Menu;