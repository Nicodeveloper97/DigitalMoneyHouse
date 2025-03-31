"use client";
import React, { useEffect, useState } from "react";
import Menu from "@/app/components/menu/menu";
import AccountAPI from "../../services/Account/account.service";
import { TransferencesService } from "../../services/transferences/transferences.service";
import Swal from "sweetalert2"; 

interface TransactionCard2pageProps {
  cardInfo: {
    id: number;
    lastFourDigits: string;
  };
}

const TransactionCard2page: React.FC = () => {
  const [cardInfo, setCardInfo] = useState<TransactionCard2pageProps["cardInfo"] | null>(null);
  const [amount, setAmount] = useState<number | string>(""); // Almacenamos el monto ingresado
  const [cvu, setCvu] = useState<string>(""); // CVU obtenido del AccountAPI
  const [accountId, setAccountId] = useState<number | null>(null); // ID de cuenta

  const accountService = new AccountAPI();

  useEffect(() => {
    // Extraemos los parámetros de la URL manualmente
    const searchParams = new URLSearchParams(window.location.search);
    const cardId = searchParams.get("cardId");
    const lastFourDigits = searchParams.get("lastFourDigits");

    if (cardId && lastFourDigits) {
      setCardInfo({
        id: Number(cardId), // Convertimos a número
        lastFourDigits: lastFourDigits,
      });
    }

    // Obtener la información de la cuenta (CVU y Account ID)
    const fetchAccountInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const accountData = await accountService.getAccountInfo(token);
          setCvu(accountData.cvu);
          setAccountId(accountData.id); // Guardamos el ID de la cuenta
        }
      } catch (error) {
        console.error("Error fetching account info:", error);
      }
    };

    fetchAccountInfo();
  }, []);

  const getArgentinaDate = () => {
    const currentDate = new Date();
    const offset = -3 * 60; // UTC-3 en minutos
    const argentinaDate = new Date(currentDate.getTime() + offset * 60000);
    return argentinaDate.toISOString();
  };

  // Función para manejar el depósito
  const handleDeposit = async () => {
    if (accountId && amount && cardInfo && cvu) {
      const depositData = {
        amount: Number(amount),
        dated: getArgentinaDate(), // Fecha actual en formato ISO
        destination: cvu, // Usamos el CVU de la cuenta como destino
        origin: cvu, // Usamos el CVU como origen (depósito a la misma cuenta)
      };

      // Mostrar SweetAlert de confirmación
      Swal.fire({
        title: 'Confirmar depósito',
        text: `¿Estás seguro de que deseas depositar $${amount} de la tarjeta terminada en: ${cardInfo.lastFourDigits}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, depositar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const token = localStorage.getItem("token"); // Obtenemos el token
            if (token) {
              const transferService = new TransferencesService(accountId, token); // Creamos una instancia del servicio con el accountId y el token
              await transferService.createDeposit(depositData); // Realizamos el depósito usando createDeposit

              // Redirigir al path /transaction-card3 con parámetros en la URL
              const url = new URL("/main/transaction-card3", window.location.origin);
              url.searchParams.append("amount", amount.toString());
              url.searchParams.append("date", getArgentinaDate());
              url.searchParams.append("lastFourDigits", cardInfo.lastFourDigits);
              
              window.location.href = url.toString();
            }
          } catch (error) {
            console.error("Error realizando el depósito:", error);
            // Mostrar alerta de error
            Swal.fire({
              title: 'Error',
              text: 'Hubo un problema realizando el depósito.',
              icon: 'error',
              confirmButtonText: 'OK',
            });
          }
        }
      });
    }
  };

  return (
    <div className="flex">
      <Menu />
      <main className="flex-1 p-4 flex flex-col items-center mt-8 min-h-screen">
        <div className="bg-[#201F22] p-6 rounded-lg shadow-lg w-[1006px] h-[306px] relative">
          <h2 className="text-[#C1FD35] font-bold text-xl absolute top-6 left-9">
            ¿Cuánto querés ingresar a la cuenta?
          </h2>
          {cardInfo ? (
            <div className="mt-12 ml-4">
              <input
                type="number"
                placeholder="$0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-[360px] h-[64px] p-2 mt-4 text-black bg-white rounded-md mb-4"
              />
              <button
                onClick={handleDeposit}
                disabled={!amount} // Deshabilitar el botón si no hay monto
                className={`absolute font-bold bottom-8 right-6 w-[233px] h-[48px] rounded-[10px] ${amount ? "bg-lime-500" : "bg-gray-400"} text-black`}
              >
                Continuar
              </button>
            </div>
          ) : (
            <p>Cargando información de la tarjeta...</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default TransactionCard2page;