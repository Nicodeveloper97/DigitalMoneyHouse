import React from 'react';
import Link from "next/link";

const CreateAccountButtonGray = () => (
  <Link href="/main/sign-up">
    <div className="w-[300px] h-[50px] sm:w-[360px] sm:h-[64px] bg-gray-300 text-black px-4 py-2 rounded-[10px] font-bold text-center border border-gray-200 pt-4 mt-4">
      Crear cuenta
    </div>
  </Link>
);

export default CreateAccountButtonGray;