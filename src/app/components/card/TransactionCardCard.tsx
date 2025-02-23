import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import AccountAPI from "../../services/Account/account.service";
import cardService from "../../services/cards/cards.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

const TransactionCardCard = () => {
  const [cards, setCards] = useState<any[]>([]);
  const [selectedCard, setSelectedCard] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 5;

  const accountService = new AccountAPI();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const token = localStorage.getItem("token");
        const accountInfo = await accountService.getAccountInfo(token);
        const accountId = accountInfo.id;
        const cards = await cardService.getCardsByAccountId(accountId, token);
        setCards(cards);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };
    fetchCards();
  }, []);

  const handleCardSelection = (card: any) => {
    setSelectedCard(card);
  };

  const handleNewCardClick = () => {
    window.location.href = "/main/card1";
  };

  const handleContinueClick = () => {
    if (selectedCard) {
      const selectedCardInfo = selectedCard;

      if (selectedCardInfo && selectedCardInfo.id && selectedCardInfo.number_id) {
        window.location.href = `/transaction-card2?cardId=${selectedCardInfo.id}&lastFourDigits=${selectedCardInfo.number_id.toString().slice(-4)}`;
      } else {
        Swal.fire({
          title: "Error",
          text: "Información de la tarjeta seleccionada no es válida",
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#4caf50",
        });
      }
    } else {
      Swal.fire({
        title: "Error",
        text: "Por favor seleccione una tarjeta",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#4caf50",
      });
    }
  };

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);

  const totalPages = Math.ceil(cards.length / cardsPerPage);
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="flex justify-center items-center p-4">
      <div className="bg-black p-8 rounded-lg shadow-lg w-full sm:w-[350px] md:w-[511px] lg:w-[1006px]">
        <h2 className="text-3xl text-lime-500 font-semibold mb-6">
          Seleccionar tarjeta
        </h2>
        <div className="bg-white rounded-lg p-4 mb-6">
          <h3 className="text-xl font-bold text-black mb-4">Tus tarjetas</h3>
          {loading ? (
            <p>Cargando tarjetas...</p>
          ) : (
            <div>
              {currentCards?.map((card) => (
                <div
                  key={card.id}
                  className={`flex justify-between items-center p-4 mb-2 rounded-lg border-2 ${
                    selectedCard?.id === card.id
                      ? "border-lime-500"
                      : "border-gray-300"
                  }`}
                  onClick={() => handleCardSelection(card)}
                >
                  <div className="flex items-center">
                    <FontAwesomeIcon
                      icon={faCirclePlus}
                      className="text-lime-500 mr-4"
                      size="lg"
                    />
                    <span className="text-black font-medium">
                      Terminada en {card?.number_id?.toString().slice(-4)}{" "}
                    </span>
                  </div>
                  <input
                    type="radio"
                    checked={selectedCard?.id === card.id}
                    onChange={() => handleCardSelection(card)}
                    className="form-radio text-lime-500"
                  />
                </div>
              ))}

              {cards.length > cardsPerPage && (
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={goToPreviousPage}
                    className="bg-lime-500 text-black px-4 py-2 rounded-lg font-semibold"
                    disabled={currentPage === 1}
                  >
                    Anterior
                  </button>
                  <p className="text-black">
                    {currentPage} de {totalPages}
                  </p>
                  <button
                    onClick={goToNextPage}
                    className="bg-lime-500 text-black px-4 py-2 rounded-lg font-semibold"
                    disabled={currentPage === totalPages}
                  >
                    Siguiente
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={handleNewCardClick}
            className="flex items-center bg-black text-lime-500 px-4 py-2 rounded-lg font-semibold"
          >
            <FontAwesomeIcon icon={faCirclePlus} className="mr-2" />
            Nueva tarjeta
          </button>

          <button
            onClick={handleContinueClick}
            className="bg-lime-500 text-black px-8 py-2 rounded-lg font-semibold"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionCardCard;