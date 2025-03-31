import React from "react";
import Menu from '../../components/menu/menu'; 
import CardHome from '@/app/components/card/CardHome';
import HomeButton from '@/app/components/buttons/HomeButton';
import ActivityList from '@/app/components/activity/ActivityList';

const HomePage = () => {
  return (
    <div className="flex flex-col sm:flex-row">
      <Menu />
      
      <main className="flex-1 p-4 flex flex-col items-center mt-2 sm:mt-8 min-h-screen">
        
        

        
        <div className="w-full px-2 sm:px-0 max-w-[320px] sm:max-w-[511px] lg:max-w-[1006px]">
          
          <div className="mb-4">
            <CardHome />
          </div>
          
          
          <div className="w-full flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 mb-4">
            <HomeButton text="Cargar dinero" href="/main/transactions" />
            <HomeButton text="Pago de servicios" href="/main/services" />
          </div>
          
          
          <div className="mt-2">
            <ActivityList />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;