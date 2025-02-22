import React from "react";

type CardProps = {
  title: string;
  content: string;
};

const Card: React.FC<CardProps> = ({ title, content }) => {
  return (
    <div className="h-[190px] sm:h-[224px] lg:h-[246px] w-[300px] sm:w-[400px] lg:w-[500px] bg-white rounded-[20px] sm:rounded-[30px] shadow-lg">
      <div className="p-4 sm:p-6">
        <h2 className="text-[18px] sm:text-[24px] lg:text-[34px] font-bold mb-2 sm:mb-4">
          {title}
        </h2>
        <div className="h-1 bg-lime-500 mb-2 sm:mb-4"></div>
        <p className="text-[12px] sm:text-[16px] font-normal text-black">
          {content}
        </p>
      </div>
    </div>
  );
};

export default Card;