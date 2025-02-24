"use client";
import React, { useEffect, useState, useMemo } from "react";
import Menu from "@/app/components/menu/menu";
import ClipLoader from "react-spinners/ClipLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

interface TransactionData {
  name: string;
  date: string;
  lastFourDigits: string;
}

const Services4Page = () => {
  const [transactionData, setTransactionData] = useState<TransactionData>({
    name: "",
    date: "",
    lastFourDigits: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const name = urlParams.get("name") || "";
      const lastFourDigits = urlParams.get("lastFourDigits") || "";
      const date = urlParams.get("date") || new Date().toISOString();
      setTransactionData({ name, date, lastFourDigits });
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, []);

  const formattedDate = useMemo(
    () => new Date(transactionData.date).toLocaleString(),
    [transactionData.date]
  );

  return (
    <div className="flex">
      <Menu />
      <main className="flex-1 p-4 flex flex-col justify-center items-center min-h-screen relative">
        <h1 className="text-3xl font-bold block md:hidden mb-4">Pagar servicios</h1>
        <div className="flex flex-col items-center w-full max-w-[350px] md:max-w-[1006px]">
          <div className="bg-lime-400 w-full h-[148px] p-6 rounded-lg text-center">
            <div className="text-4xl mb-4">
              <FontAwesomeIcon icon={faCircleCheck} />
            </div>
            <h2 className="text-xl font-semibold">Ya realizaste tu pago</h2>
          </div>
          <div className="bg-black w-full p-6 rounded-lg text-white mt-4">
            <p>{formattedDate} hs.</p>
            <p className="text-3xl font-semibold mt-2 text-lime-400">{transactionData.name}</p>
            <p className="mt-4">monto</p>
            <p className="text-3xl font-semibold mt-2 text-lime-400">$5547.25</p>
            <p className="mt-4">de</p>
            <p className="font-semibold text-lime-400">Cuenta propia</p>
            <p>Tarjeta terminada en: {transactionData.lastFourDigits}</p>
          </div>
          <div className="flex justify-between md:justify-end space-x-4 mt-6 w-full">
            <button
              className="bg-gray-300 font-bold text-black w-full max-w-[350px] md:max-w-[233px] h-[64px] px-4 py-2 rounded-md"
              onClick={() => (window.location.href = "/main/home")}
            >
              Ir al inicio
            </button>
            <button className="bg-lime-400 font-bold text-black w-full max-w-[350px] md:max-w-[233px] h-[64px] px-4 py-2 rounded-md">
              Descargar comprobante
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Services4Page;