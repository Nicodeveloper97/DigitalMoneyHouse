"use client"
import React, { useEffect, useState } from 'react';
import AccountAPI from '../../services/Account/account.service'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faPen } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

interface AccountInfo {
  cvu: string;
  alias: string;
  id: number;
}

const DataCard = () => {
  const [accountInfo, setAccountInfo] = useState<AccountInfo | null>(null);
  const [newAlias, setNewAlias] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [showInput, setShowInput] = useState(false); 
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('token');
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    const fetchAccountInfo = async () => {
      if (token) {
        try {
          const accountAPI = new AccountAPI();
          const data = await accountAPI.getAccountInfo(token);
          setAccountInfo(data);
        } catch (error) {
          console.error('Error fetching account info:', error);
        }
      } else {
        console.error('No se encontró un token válido.');
      }
    };

    fetchAccountInfo();
  }, [token]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    Swal.fire({
      icon: 'success',
      title: 'Copiado',
      text: `Se ha copiado: ${text}`,
      timer: 2000,
      showConfirmButton: false,
    });
  };

  const handleUpdateAlias = async () => {
    if (accountInfo && newAlias) {
      const aliasPattern = /^[a-zA-Z0-9]+\.[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/; 

      if (!aliasPattern.test(newAlias)) {
        Swal.fire({
          icon: 'error',
          title: 'Alias inválido',
          text: 'El alias debe tener tres palabras separadas por un punto (.)',
        });
        return;
      }

      setIsUpdating(true);  // Deshabilita el botón mientras se actualiza
      try {
        const accountAPI = new AccountAPI();
        await accountAPI.updateAccountAlias(token!, accountInfo.id, newAlias); 
        setAccountInfo({ ...accountInfo, alias: newAlias }); 
        setNewAlias('');
        setShowInput(false); 
        
        Swal.fire({
          icon: 'success',
          title: 'Alias actualizado',
          text: 'El alias se ha actualizado correctamente',
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error('Error updating alias:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema actualizando el alias',
        });
      } finally {
        setIsUpdating(false);
      }
    }
  };

  if (!accountInfo) {
    return <p>Cargando datos...</p>;
  }

  return (
    <div className="bg-black text-white p-6 rounded-lg shadow-md w-[350px] sm:w-[511px] lg:w-[1003px] mt-6">
      <p className="font-bold text-gray-300 mb-4">Copia tu cvu o alias para ingresar o transferir dinero desde otra cuenta</p>
      <div className="mb-2">
        <span className="text-gray-400 text-[20px] block">CVU</span>
        <div className="flex items-center justify-between">
          <span>{accountInfo.cvu}</span>
          <FontAwesomeIcon 
            icon={faCopy} 
            className="text-lime-500 cursor-pointer" 
            onClick={() => handleCopy(accountInfo.cvu)} 
          />
        </div>
      </div>
      <div className="mt-4">
        <span className="text-gray-400 text-[20px] block">Alias</span>
        <div className="flex items-center justify-between">
          <span>{accountInfo.alias}</span>
          <div className="flex items-center">
            <FontAwesomeIcon 
              icon={faCopy} 
              className="text-lime-500 cursor-pointer mr-4" 
              onClick={() => handleCopy(accountInfo.alias)} 
            />
            <FontAwesomeIcon 
              icon={faPen} 
              className="text-lime-500 cursor-pointer" 
              onClick={() => setShowInput(!showInput)}
            />
          </div>
        </div>
      </div>
      {showInput && (
        <>
          <div className="mt-4">
            <input
              type="text"
              value={newAlias}
              onChange={(e) => setNewAlias(e.target.value)}
              placeholder="Nuevo alias (e.g., palabra1.palabra2.palabra3)"
              className="text-black p-2 rounded w-full"
            />
          </div>

          <div className="mt-4">
            <button
              onClick={handleUpdateAlias}
              disabled={isUpdating || !newAlias.trim()}
              className={`bg-lime-500 text-white px-4 py-2 rounded ${
                isUpdating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-lime-600'
              }`}
            >
              {isUpdating ? 'Actualizando...' : 'Actualizar Alias'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default DataCard;