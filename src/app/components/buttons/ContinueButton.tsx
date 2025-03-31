import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import AuthAPI from "../../services/auth/auth.service";
import Swal from "sweetalert2";

type ContinueButtonProps = {
  isEnabled: boolean;
  handleSubmit?: () => void; 
};

const ContinueButton = ({ isEnabled, handleSubmit }: ContinueButtonProps) => {
  const [targetUrl, setTargetUrl] = useState("/");
  const { getValues } = useFormContext();
  const [isCardPage, setIsCardPage] = useState(false);

  useEffect(() => {
    const pathname = window.location.pathname;

    switch (pathname) {
      case "/main/card2":
        setIsCardPage(true);
        break;
      case "/main/login-password":
        setTargetUrl("/");
        break;
      case "/main/login":
        setTargetUrl("/login-password");
        break;
      default:
        setTargetUrl("/");
        break;
    }
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await AuthAPI.login({ email, password });
      if (response) {
        localStorage.setItem("token", response.token);
        Swal.fire({
          icon: "success",
          title: "¡Inicio de sesión exitoso!",
          text: "Has sido redirigido a la página principal.",
          confirmButtonText: "Aceptar",
        }).then(() => {
          window.location.replace("/main/home");
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error de autenticación",
        text: "Verifique sus credenciales e intente de nuevo.",
        confirmButtonText: "Aceptar",
      });
    }
  };

  const handleClick = async () => {
    const pathname = window.location.pathname;

    switch (pathname) {
      case "/main/login":
        const email = getValues("email");
        if (email) {
          sessionStorage.setItem("email", email);
          window.location.href = "/main/login-password";
        }
        break;

      case "/main/login-password":
        const storedEmail = sessionStorage.getItem("email");
        const password = getValues("password");
        if (storedEmail && password) {
          await handleLogin(storedEmail, password);
        }
        break;

      case "/main/card2":
        if (isEnabled && handleSubmit) {
          handleSubmit();
        }
        break;

      default:
        break;
    }
  };

  return isCardPage && !isEnabled ? (
    <div className="w-[300px] h-[50px] sm:w-[360px] sm:h-[64px] bg-[#CECECE] text-black px-4 py-2 rounded-[10px] font-bold text-center pt-4 cursor-not-allowed pointer-events-none mb-2">
      Continuar
    </div>
  ) : (
    <div
      className={`w-[300px] h-[50px] sm:w-[360px] sm:h-[64px] bg-[#C1FD35] text-black px-4 py-2 rounded-[10px] font-bold text-center pt-4 cursor-pointer mb-2 ${
        !isEnabled ? "pointer-events-none" : ""
      }`}
      onClick={handleClick}
    >
      Continuar
    </div>
  );
};

export default ContinueButton;