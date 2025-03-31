import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const ProfileButton: React.FC = () => (
  <button className="flex items-center justify-between h-[116px] mt-6 p-4 bg-[#C1FD35] hover:bg-lime-600 text-black rounded-lg shadow-lg w-[350px] sm:w-[511px] lg:w-[1003px]">
    <span className="font-bold" >Gestioná los medios de pago</span>
    <FontAwesomeIcon icon={faArrowRight} className="text-black" />
  </button>
);

export default ProfileButton;