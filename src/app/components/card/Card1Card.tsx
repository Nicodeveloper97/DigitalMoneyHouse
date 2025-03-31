
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link'; 

const Card1Card = () => {
  return (
    <Link href="/main/card2">
      <div
        className="bg-black text-white p-6 rounded-lg flex justify-between items-center w-[350px] sm:w-[511px] lg:w-[1006px] h-[167px] mb-6 cursor-pointer"
      >
        <div>
          <p className="text-lg">Agregá tu tarjeta de débito o crédito</p>
          <div className="flex items-center mt-4">
            <FontAwesomeIcon icon={faPlus} className="text-lime-400 mr-2" style={{ width: "20px" }} />
            <p className="text-xl font-semibold text-lime-400">Nueva tarjeta</p>
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6 text-lime-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </Link>
  );
};

export default Card1Card;