import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface TransactionCardProps {
  icon: IconProp;
  text: string;
  onClick: () => void;
}

const TransactionCard: React.FC<TransactionCardProps> = ({ icon, text, onClick }) => {
  return (
    <div
      className="flex justify-between items-center bg-black text-lime-500 p-4 rounded-lg mb-8 cursor-pointer hover:bg-gray-800 transition duration-300 w-[350px] sm:w-[513px] lg:w-[1006px] h-[157px]"
      onClick={onClick}
    >
      <div className="flex items-center">
        <FontAwesomeIcon icon={icon} className="text-lime-500 mr-4" size="2x" />
        <span className="text-xl font-semibold">{text}</span>
      </div>
      <FontAwesomeIcon icon={faArrowRight} className="text-lime-500" size="lg" />
    </div>
  );
};

export default TransactionCard;