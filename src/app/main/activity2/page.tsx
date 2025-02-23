"use client";
import React, { useEffect, useState } from "react";
import Menu from "@/app/components/menu/menu";
import { transactionsAPI } from "../../services/transaction/transactions.service";
import AccountAPI from "../../services/Account/account.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import ClipLoader from "react-spinners/ClipLoader";

interface Transaction {
  id: string;
  dated: string;
  amount: number;
  description: string;
  type: string;
  origin?: string;
  destination?: string;
}

const Activity2Page = () => {
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);
  const accountAPI = new AccountAPI();

  useEffect(() => {
    const fetchTransactionDetails = async () => {
      try {
        const transactionId = localStorage.getItem("selectedTransactionId");
        const token = localStorage.getItem("token");

        if (transactionId && token) {
          const accountInfo = await accountAPI.getAccountInfo(token);
          const accountId = accountInfo.id;

          const transactionData = await transactionsAPI.getTransaction(
            accountId,
            transactionId
          );
          setTransaction(transactionData);
        }
      } catch (error) {
        console.error("Error fetching transaction details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionDetails();
  }, []);

  const handleGoHome = () => {
    window.location.href = "/home";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader size={50} color={"lime"} loading={loading} />
      </div>
    );
  }

  const renderTransactionDetails = () => {
    if (!transaction) {
      return <p className="text-white">No se encontró la transacción.</p>;
    }

    const isDeposit = transaction.type === "Deposit";
    const isTransfer = transaction.type === "Transfer";
    const isNegativeAmount = transaction.amount < 0;

    return (
      <div className="bg-black rounded-lg shadow p-6 sm:w-[350px] md:w-[511px] lg:w-[1006px] text-white">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold flex items-center text-lime-500">
            <FontAwesomeIcon icon={faCheckCircle} className="text-lime-500 mr-2" />
            Aprobada
          </h2>
          <span>{new Date(transaction.dated).toLocaleString()}</span>
        </div>

        <p className="mb-4">
          <strong className="text-lime-500">Descripción:</strong> {transaction.description}
        </p>
        <p className="mb-4">
          <strong className="text-lime-500">El monto de:</strong> ${transaction.amount.toFixed(2)}
        </p>
        {isDeposit && (
          <p className="mb-4">
            <strong className="text-lime-500">Desde una cuenta propia.</strong>
          </p>
        )}
        {isTransfer && (
          <>
            <p className="mb-4">
              <strong className="text-lime-500">{isNegativeAmount ? "Hacia:" : "Desde:"}</strong>{" "}
              {isNegativeAmount ? transaction.destination : transaction.origin}
            </p>
          </>
        )}
        <p className="mb-4">
          <strong className="text-lime-500">Número de transacción:</strong> {transaction.id}
        </p>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen">
      <Menu />
      <main className="flex-1 p-8 flex flex-col items-center">
        <h1 className="block text-2xl font-bold mb-4 sm:hidden">Actividad</h1>
        {renderTransactionDetails()}
        <div className="flex justify-end sm:w-[350px] md:w-[511px] lg:w-[1006px] mt-4">
          <button
            className="font-bold bg-gray-500 text-black px-4 py-2 rounded mr-2"
            onClick={handleGoHome}
          >
            Ir al inicio
          </button>
          <button className="bg-lime-500 text-black px-4 py-2 rounded font-bold">
            Descargar comprobante
          </button>
        </div>
      </main>
    </div>
  );
};

export default Activity2Page;