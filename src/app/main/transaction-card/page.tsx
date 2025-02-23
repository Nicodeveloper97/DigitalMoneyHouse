"use client";
import React from "react";
import Menu from "@/app/components/menu/menu";
import TransactionCardCard from "../../components/card/TransactionCardCard";

const TransactionCardPage = () => {
  return (
    <div className="flex">
      <Menu />
      <main className="flex-1 p-4 flex justify-center items-center mt-8 min-h-screen">
        <TransactionCardCard />
      </main>
    </div>
  );
};

export default TransactionCardPage;