/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState, useEffect } from "react";
import Menu from "../../components/menu/menu";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { accountSchema } from "../../yup/yup";
import ClipLoader from "react-spinners/ClipLoader";

const AccountNumberPage = () => {
  const methods = useForm({
    resolver: yupResolver(accountSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = methods;

  const onSubmit = (data: any) => {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get("name");
    window.location.href = `/main/services3?name=${name}&accountNumber=${data.accountNumber}`;
  };


  return (
    <div className="flex">
      <Menu />
      <main className="flex-1 p-4 flex flex-col items-center mt-8 min-h-screen">
        <h1 className="block text-2xl font-bold mb-4 sm:hidden">
          Pagar servicios
        </h1>
        <div className="bg-black text-white p-8 rounded-lg shadow-lg w-full max-w-screen-md sm:max-w-[350px] md:max-w-[513px] lg:max-w-[1006px]">
          <h2 className="text-left text-2xl font-bold mb-6">
            Número de cuenta sin el primer 2
          </h2>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
              <input
                type="text"
                {...register("accountNumber")}
                maxLength={11}
                className={`w-[300px] p-2 mb-4 rounded-lg text-black ${errors.accountNumber ? "border-red-500" : ""}`}
                placeholder="37289701912"
              />
              {errors.accountNumber && (
                <p className="text-red-500 mb-4">{errors.accountNumber.message}</p>
              )}
              <p className="text-sm text-gray-400 mb-4">
                Son 11 números sin espacios, sin el "2" inicial. Agregá ceros adelante si tenés menos.
              </p>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="w-[233px] h-[50px] py-2 rounded-lg bg-lime-500 text-black font-bold"
                >
                  Continuar
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </main>
    </div>
  );
};

export default AccountNumberPage;