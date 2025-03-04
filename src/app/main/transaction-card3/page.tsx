"use client"
import React, { useEffect, useState } from 'react';
import Menu from '@/app/components/menu/menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

interface TransactionData {
  amount: string;
  date: string;
  lastFourDigits: string;
}

const TransactionCard3Page = () => {
  const [transactionData, setTransactionData] = useState<TransactionData>({
    amount: '',
    date: '',
    lastFourDigits: ''
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      setTransactionData({
        amount: urlParams.get('amount') || '',
        date: urlParams.get('date') || '',
        lastFourDigits: urlParams.get('lastFourDigits') || ''
      });
    }
  }, []);

  return (
    <div className="flex">
      <Menu />
      <main className="flex-1 p-4 flex justify-center items-center min-h-screen relative">
        <div className="flex flex-col items-center w-full max-w-[1006px]"> 
          <div className="bg-lime-400 w-full h-[148px] p-6 rounded-lg text-center">
            <div className="text-4xl mb-4">
              <FontAwesomeIcon icon={faCircleCheck} />
            </div>
            <h2 className="text-xl font-semibold">Ya cargamos el dinero en tu cuenta</h2>
          </div>
          <div className="bg-black w-full p-6 rounded-lg text-white mt-4">
            <p>{transactionData.date ? new Date(transactionData.date).toLocaleString() : ''} hs.</p>
            <p className="text-3xl font-semibold mt-2 text-lime-400">${transactionData.amount}</p> 
            <p className="mt-4">de</p>
            <p className="font-semibold text-lime-400">Cuenta propia</p> 
            <p>Tarjeta terminada en: {transactionData.lastFourDigits}</p>
          </div>
          <div className="flex justify-end space-x-4 mt-6 w-full"> 
            <button
              className="bg-gray-300 font-bold text-black w-[233px] h-[64px] px-4 py-2 rounded-md"
              onClick={() => window.location.href = '/main/home'}
            >
              Ir al inicio
            </button>
            <button className="bg-lime-400 font-bold text-black w-[233px] h-[64px] px-4 py-2 rounded-md">
              Descargar comprobante
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default TransactionCard3Page;