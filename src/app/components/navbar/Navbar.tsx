"use client";
import Link from "next/link";
import React, { useEffect, useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import userApi from "../../services/users/users.service";
import NavbarMobile from '../buttons/NavbarMobile';

const Navbar = () => {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({ firstname: "", lastname: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      const decodeToken = (token: string) => {
        try {
          const payload = token.split(".")[1];
          const decodedPayload = JSON.parse(
            atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
          );
          return decodedPayload.username;
        } catch (error) {
          console.error("Error al decodificar el token:", error);
          return null;
        }
      };

      const username = decodeToken(token);
      if (username) {
        userApi
          .getUserData(token, username)
          .then((userData) => {
            setUserInfo({
              firstname: userData.firstname || "Usuario",
              lastname: userData.lastname || "",
            });
          })
          .catch((error) => {
            console.error("Error al obtener los datos del usuario:", error);
          });
      }
    }
  }, []);

  const bgColor = useMemo(
    () =>
      ["/login", "/login-password", "/sign-up"].includes(pathname)
        ? "bg-lime-500"
        : "bg-black",
    [pathname]
  );

  const logo = useMemo(
    () =>
      ["/login", "/login-password", "/sign-up"].includes(pathname)
        ? "/assets/Logo-black.png"
        : "/assets/logo.png",
    [pathname]
  );

  const getInitials = useMemo(() => {
    if (!userInfo.firstname && !userInfo.lastname) return "NN";
    return (
      (userInfo.firstname.charAt(0) || "") + (userInfo.lastname.charAt(0) || "")
    );
  }, [userInfo]);

  return (
    <div>
      <div
        className={`${bgColor} h-16 w-full flex justify-between items-center px-4 hidden md:flex`}
      >
        <div className="text-white font-bold">
          <Link href={isLoggedIn ? "/main/home" : "/"}>
            <img src={logo} alt="Logo" className="h-7 w-auto mr-4 pl-0 sm:pl-0" />
          </Link>
        </div>

        {!isLoggedIn ? (
          !["/login", "/login-password", "/sign-up"].includes(pathname) && (
            <div className="flex space-x-4">
              <Link href="/main/login">
                <div className="bg-black text-lime-500 px-4 py-2 rounded border border-lime-500 font-bold">
                  Ingresar
                </div>
              </Link>
              <Link href="/main/sign-up">
                <button className="bg-lime-500 text-black px-4 py-2 rounded font-bold">
                  Crear cuenta
                </button>
              </Link>
            </div>
          )
        ) : (
          <Link href="/main/home">
            <div className="flex items-center space-x-4">
              <div className="bg-lime-500 text-black font-bold rounded-full w-10 h-10 flex items-center justify-center">
                {getInitials}
              </div>
              <span className="text-white font-bold">
                Hola, {userInfo.firstname} {userInfo.lastname}
              </span>
            </div>
          </Link>
        )}
      </div>
      <NavbarMobile userInfo={userInfo} isLoggedIn={isLoggedIn} />
    </div>
  );
};

export default Navbar;