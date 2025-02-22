import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import AuthAPI from "../../services/auth/auth.service";
import Swal from 'sweetalert2';

type ContinueButtonProps = {
  isEnabled: boolean;
};

const ContinueButton = ({ isEnabled }: ContinueButtonProps) => {
  const [targetUrl, setTargetUrl] = useState("/");
  const { getValues } = useFormContext();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const pathname = window.location.pathname;
      if (pathname === "/main/login-password") {
        setTargetUrl("/");
      } else if (pathname === "/main/login") {  
        setTargetUrl("/main/login-password");  
      }
    }
  }, []);

  const handleClick = async () => {
    if (typeof window !== "undefined") {
      const pathname = window.location.pathname;

      if (pathname === "/main/login") { 
        const email = getValues("email");
        if (email) {
          sessionStorage.setItem("email", email);
          window.location.href = "/main/login-password";  
        }
      } else if (pathname === "/main/login-password") {  
        const email = sessionStorage.getItem("email");
        const password = getValues("password");

        if (email && password) {
          try {
            const response = await AuthAPI.login({ email, password });
            if (response) {
              localStorage.setItem("token", response.token);
              Swal.fire({
                icon: 'success',
                title: '¡Inicio de sesión exitoso!',
                text: 'Has sido redirigido a la página principal.',
                confirmButtonText: 'Aceptar'
              }).then(() => {
                window.location.replace("/main/home"); 
              });
            }
          } catch (error) {
            Swal.fire({
              icon: 'error',
              title: 'Error de autenticación',
              text: 'Verifique sus credenciales e intente de nuevo.',
              confirmButtonText: 'Aceptar'
            });
          }
        }
      }
    }
  };

  return isEnabled ? (
    <div
      className="w-[300px] h-[50px] sm:w-[360px] sm:h-[64px] bg-lime-500 text-black px-4 py-2 rounded-[10px] font-bold text-center pt-4 cursor-pointer mb-2"
      onClick={handleClick}
    >
      Continuar
    </div>
  ) : (
    <div className="w-[300px] h-[50px] sm:w-[360px] sm:h-[64px] bg-lime-500 text-black px-4 py-2 rounded-[10px] font-bold text-center pt-4 cursor-not-allowed pointer-events-none mb-2">
      Continuar
    </div>
  );
};

export default ContinueButton;
