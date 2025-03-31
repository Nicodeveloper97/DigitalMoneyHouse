"use client";
import React, { useEffect, useState } from 'react';
import AccountAPI from '../../services/Account/account.service';

const CardHome = () => {
  const [availableAmount, setAvailableAmount] = useState<number | null>(null);
  const [isAmountVisible, setIsAmountVisible] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const fetchAccountInfo = async () => {
      try {
        const accountService = new AccountAPI();
        const { available_amount } = await accountService.getAccountInfo(token);
        setAvailableAmount(available_amount);
      } catch (error) {
        console.error('Error al obtener la información de la cuenta:', error);
      }
    };

    fetchAccountInfo();
  }, []);

  const toggleAmountVisibility = () => {
    setIsAmountVisible(!isAmountVisible);
  };

  return (
    <div className="bg-[#201F22] w-full max-w-[95vw] sm:w-[511px] lg:w-[1006px] h-[200px] sm:h-[230px] rounded-lg flex flex-col p-4 sm:p-6 relative">
      {/* Enlaces superiores - ahora en una sola línea en todos los dispositivos */}
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h2 className="text-white text-sm sm:text-base font-medium">Mi Cuenta</h2>
        <div className="flex gap-3 sm:gap-4">
          <a href="/main/card1" className="text-white text-xs sm:text-sm underline whitespace-nowrap">
            Ver tarjetas
          </a>
          <a href="/main/account" className="text-white text-xs sm:text-sm underline whitespace-nowrap">
            Ver CVU
          </a>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="mt-auto">
        <h3 className="text-white text-sm sm:text-base mb-2 sm:mb-3">Dinero disponible</h3>
        
        {availableAmount !== null ? (
          <div className="flex flex-col">
            {isAmountVisible ? (
              <div className="flex items-center">
                <span className="text-white text-2xl sm:text-3xl lg:text-4xl font-semibold border-2 border-lime-500 rounded-full px-3 sm:px-4 py-1 sm:py-2 whitespace-nowrap overflow-x-auto">
                  ${availableAmount.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            ) : (
              <div className="bg-gray-700 rounded-full px-4 py-2 w-40 sm:w-48 h-10 sm:h-14 flex items-center justify-center">
                <span className="text-gray-300 text-xl sm:text-2xl">•••••••</span>
              </div>
            )}
            <button
              onClick={toggleAmountVisibility}
              className="text-lime-400 mt-2 sm:mt-3 text-xs sm:text-sm underline self-start"
            >
              {isAmountVisible ? 'Ocultar monto' : 'Mostrar monto'}
            </button>
          </div>
        ) : (
          <p className="text-gray-400 text-sm">Cargando...</p>
        )}
      </div>
    </div>
  );
};

export default CardHome;