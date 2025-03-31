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
      className="flex justify-between items-center bg-[#201F22] text-[#C1FD35] p-4 rounded-lg mb-4 sm:mb-6 cursor-pointer 
                 w-full max-w-[95vw] sm:w-[513px] lg:w-[1006px] 
                 h-[100px] sm:h-[130px] lg:h-[157px]
                 hover:bg-[#2a292d] transition-colors duration-200"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      <div className="flex items-center space-x-3 sm:space-x-4">
        <FontAwesomeIcon 
          icon={icon} 
          className="text-[#C1FD35] 
                    text-xl sm:text-2xl lg:text-3xl" 
        />
        <span className="text-base sm:text-lg lg:text-xl font-semibold">
          {text}
        </span>
      </div>
      <FontAwesomeIcon 
        icon={faArrowRight} 
        className="text-[#C1FD35] 
                  text-lg sm:text-xl" 
      />
    </div>
  );
};

export default TransactionCard;