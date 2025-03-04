import React from "react";
import Menu from '../../components/menu/menu'; 
import CardHome from '@/app/components/card/CardHome';
import HomeButton from '@/app/components/buttons/HomeButton';
import ActivityList from '@/app/components/activity/ActivityList';

const HomePage = () => {
  return (
    <div className="flex flex-col sm:flex-row">
      
      <Menu />

      
      <main className="flex-1 p-2 flex flex-col items-center mt-2 sm:mt-8 min-h-screen">
        
        <h1 className="block text-xl font-bold mb-2 sm:hidden">Inicio</h1>

        <div className="w-full max-w-[320px] sm:max-w-[511px] lg:max-w-[1006px]">
          <CardHome />
        </div>
        <div className="w-full max-w-[320px] sm:max-w-[511px] lg:max-w-[1006px] flex flex-col sm:flex-row sm:space-x-4 mt-2 space-y-2 sm:space-y-0">
          <HomeButton text="Cargar dinero" href="/main/transactions" />
          <HomeButton text="Pago de servicios" href="/main/services" />
        </div>
        <div className="w-full max-w-[320px] sm:max-w-[511px] lg:max-w-[1006px] mt-2">
          <ActivityList />
        </div>
      </main>
    </div>
  );
};

export default HomePage;