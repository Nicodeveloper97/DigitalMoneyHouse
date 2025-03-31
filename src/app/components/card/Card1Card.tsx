import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link'; 

const Card1Card = () => {
  return (
    <Link href="/main/card2" className="block w-full">
      <div
        className="bg-black text-white p-4 sm:p-5 md:p-6 rounded-lg flex justify-between items-center 
                   w-full max-w-[90vw] sm:max-w-[95vw] md:w-[511px] lg:w-[800px] xl:w-[1006px] 
                   h-[120px] sm:h-[140px] md:h-[167px] 
                   mb-4 sm:mb-5 md:mb-6 
                   cursor-pointer hover:bg-gray-900 transition-colors duration-200
                   border border-gray-800"
      >
        <div className="flex-1">
          <p className="text-base sm:text-lg md:text-xl">Agregá tu tarjeta de débito o crédito</p>
          <div className="flex items-center mt-2 sm:mt-3 md:mt-4">
            <FontAwesomeIcon 
              icon={faPlus} 
              className="text-lime-400 mr-2" 
              style={{ width: "16px", height: "16px" }}
              fontSize="16px"
            />
            <p className="text-lg sm:text-xl font-semibold text-lime-400">Nueva tarjeta</p>
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-5 h-5 sm:w-6 sm:h-6 text-lime-400 ml-2"
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