import React from 'react';

type SignUpButtonProps = {
  isEnabled: boolean;
};

const SignUpButton = ({ isEnabled }: SignUpButtonProps) => {
  return (
    <button
      type="submit"
      disabled={!isEnabled}
      className={`w-[300px] h-[50px] sm:w-[360px] sm:h-[64px] ${isEnabled ? 'bg-[#C1FD35] text-black pt-2' : 'bg-gray-400 text-gray-700 cursor-not-allowed pt-2'} px-4 py-2 rounded-[10px] font-bold text-center pt-4 mb-2`}
    >
      Crear cuenta
    </button>
  );
};

export default SignUpButton;