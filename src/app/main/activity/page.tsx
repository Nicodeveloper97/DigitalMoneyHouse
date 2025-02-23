import React from "react";
import Menu from "@/app/components/menu/menu";
import ActivityList from "@/app/components/activity/ActivityList";

const ActivityPage = () => {
  return (
    <div className="flex">
      <Menu />
      <main className="flex-1 p-4 flex flex-col items-center mt-8 min-h-screen">
        <h1 className="block text-2xl font-bold mb-4 sm:hidden">Actividad</h1>
        <ActivityList />
      </main>
    </div>
  );
};

export default ActivityPage;