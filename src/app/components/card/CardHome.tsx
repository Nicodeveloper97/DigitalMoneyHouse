"use client";
import React, { useEffect, useState } from 'react';
import AccountAPI from '../../services/Account/account.service';

const CardHome = () => {
  const [availableAmount, setAvailableAmount] = useState<number | null>(null);

  useEffect(() => {
    const fetchAccountInfo = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('No se encontró el token');
        return;
      }

      try {
        const accountService = new AccountAPI();
        const accountData = await accountService.getAccountInfo(token);
        setAvailableAmount(accountData.available_amount);
      } catch (error) {
        console.error('Error al obtener los datos de la cuenta:', error);
      }
    };

    fetchAccountInfo();
  }, []);

  return (
    <div className="bg-black w-[350px] md:w-[511px] lg:w-[1006px] h-[230px] rounded-lg flex items-start justify-start p-6 relative">
      {/* Contenedor para los enlaces en el borde superior derecho */}
      <div className="absolute top-6 right-6 flex space-x-3">
        <a href="/card1" className="text-white underline">Ver tarjetas</a>
        <a href="/account" className="text-white underline">Ver CVU</a>
      </div>

      <div className="mt-auto">
        <h1 className="text-white text-[16px] font-bold mb-4">Dinero disponible</h1>
        {availableAmount !== null ? (
          <p className="text-white text-[36px] font-semibold border-2 border-lime-500 rounded-full px-4 py-2">
            ${availableAmount.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p> 
        ) : (
          <p className="text-gray-400">Cargando...</p>
        )}
      </div>
    </div>
  );
};

export default CardHome;