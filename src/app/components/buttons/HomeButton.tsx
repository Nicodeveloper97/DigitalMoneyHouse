import React from 'react';

interface HomeButtonProps {
  text: string;
  href: string;
}

const HomeButton: React.FC<HomeButtonProps> = ({ text, href }) => {
  return (
    <a 
      href={href} 
      className="flex items-center justify-center bg-lime-500 text-black w-full md:w-[511px] lg:w-[490px] h-[106px] rounded-md shadow-md hover:bg-lime-600 text-[24px]">
      {text}
    </a>
  );
};

export default HomeButton;