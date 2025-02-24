
"use client";
import React, { useEffect, useState } from "react";
import Menu from "@/app/components/menu/menu";
import TransactionCardCard from "@/app/components/card/TransactionCardCard";

const Services3Page = () => {
  const [serviceName, setServiceName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const totalToPay = 5547.25;

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get("name");
    setServiceName(name);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer); 
  }, []);


  return (
    <div className="flex">
      <Menu />
      <main className="flex-1 p-4 flex flex-col justify-center items-center mt-8 min-h-screen">
        <h1 className="text-3xl font-bold block md:hidden mb-4">Pagar servicios</h1>
        <div className="bg-black text-white p-6 rounded-lg shadow-lg w-full max-w-[350px] md:max-w-[511px] lg:max-w-[1006px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lime-500 text-xl font-bold">{serviceName}</h2>
            <p className="text-gray-300 text-sm underline">Ver detalles del pago</p>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg">Total a pagar</span>
            <span className="text-2xl font-bold">${totalToPay.toFixed(2)}</span>
          </div>
        </div>
        <TransactionCardCard />
      </main>
    </div>
  );
};

export default Services3Page;