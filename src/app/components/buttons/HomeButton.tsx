import React from 'react';

interface HomeButtonProps {
  text: string;
  href: string;
}

const HomeButton = ({ text, href }: HomeButtonProps) => (
  <a 
    href={href}
    className="flex items-center justify-center bg-[#C1FD35] hover:bg-[#a9e02e] text-black 
               w-full max-w-[90vw] sm:w-[400px] md:w-[450px] lg:w-[490px] 
               h-[70px] sm:h-[85px] md:h-[95px] lg:h-[106px] 
               rounded-md shadow-md hover:shadow-lg
               text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px]
               transition-all duration-200 ease-in-out
               font-medium px-4"
  >
    {text}
  </a>
);

export default HomeButton;