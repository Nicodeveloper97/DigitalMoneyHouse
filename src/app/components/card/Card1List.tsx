"use client";
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import cardService from '../../services/cards/cards.service';
import AccountAPI from '../../services/Account/account.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

interface Card {
  id: number;
  number_id: number;
}

const Card1List = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [accountId, setAccountId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccountAndCards = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      const accountAPI = new AccountAPI();

      try {
        // Obtener información de la cuenta
        const accountData = await accountAPI.getAccountInfo(token);
        setAccountId(accountData.id);

        // Obtener tarjetas asociadas a la cuenta
        const response = await cardService.getCardsByAccountId(accountData.id, token);
        setCards(response);
      } catch (error) {
        console.error('Error fetching account or cards:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccountAndCards();
  }, []);

  const handleDelete = async (cardId: number) => {
    const token = localStorage.getItem('token');
    if (!token || !accountId) return;

    try {
      await cardService.deleteCard(accountId, cardId, token);
      setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
      Swal.fire("Eliminada", "La tarjeta ha sido eliminada.", "success");
    } catch (error) {
      console.error('Error deleting card:', error);
      Swal.fire("Error", "No se pudo eliminar la tarjeta.", "error");
    }
  };

  const confirmDelete = (cardId: number) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(cardId);
      }
    });
  };

  if (loading) {
    return <div>Cargando tarjetas...</div>;
  }

  return (
    <div className="bg-white rounded-lg p-6 mt-4 w-[350px] sm:w-[511px] lg:w-[1006px]">
      <h2 className="text-xl font-semibold mb-4">Tus tarjetas</h2>
      <ul>
        {cards.length > 0 ? (
          cards.map((card) => (
            <li
              key={card.id}
              className="flex justify-between items-center border-b border-gray-200 py-4"
            >
              <div className="flex items-center">
                <div className="w-4 h-4 bg-lime-400 rounded-full mr-4"></div>
                <p>Terminada en {card.number_id.toString().slice(-4)}</p>
              </div>
              <button
                onClick={() => confirmDelete(card.id)}
                className="text-red-500 hover:text-red-700"
              >
                <FontAwesomeIcon icon={faTrashAlt} />
                <span className="ml-2">Eliminar</span>
              </button>
            </li>
          ))
        ) : (
          <li className="text-black py-4">No hay tarjetas asociadas.</li>
        )}
      </ul>
    </div>
  );
};

export default Card1List;