import React from "react";
import Link from "next/link";
import Menu from "../../components/menu/menu";
import AccountCard from "@/app/components/card/AccountCard";
import ProfileButton from "@/app/components/buttons/ProfileButton";
import DataCard from "@/app/components/card/DataCard";

const AccountPage = () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : "";

  return (
    <div className="flex">
      <Menu />
      <main className="flex-1 p-4 flex flex-col items-center mt-8 min-h-screen">
        <h1 className="block text-2xl font-bold mb-4 sm:hidden">Perfil</h1>
        <AccountCard token={token || ""} />
        <Link href="/card1">
          <ProfileButton />
        </Link>
        <DataCard />
      </main>
    </div>
  );
};

export default AccountPage;