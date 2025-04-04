"use client"
import React from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputText from "@/app/components/inputs/InputText";
import InputNumber from "@/app/components/inputs/InputNumber";
import { cardScheme } from "../../yup/yup";
import Menu from "@/app/components/menu/menu";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import ContinueButton from "@/app/components/buttons/ContinueButton";
import AccountAPI from "../../services/Account/account.service";
import cardService from "../../services/cards/cards.service";
import Swal from "sweetalert2";

interface CardData {
  cardNumber: string;
  expiry: string;
  fullName: string;
  cvc: string;
}

const CardPage: React.FC = () => {
  const methods = useForm<CardData>({
    resolver: yupResolver(cardScheme),
    mode: "onChange",
  });

  const { handleSubmit, watch, formState, control } = methods;
  const { errors, isValid } = formState;
  const cardNumber = watch("cardNumber", "");
  const expiry = watch("expiry", "");
  const name = watch("fullName", "");
  const cvc = watch("cvc", "");

  const formatExpiry = (value: string): string => {
    const cleanValue = value.replace(/\D/g, "");
    return cleanValue.length <= 2 ? cleanValue : `${cleanValue.slice(0, 2)}/${cleanValue.slice(2, 4)}`;
  };

  const convertExpiryToFullYear = (expiry: string): string => {
    const [month, year] = expiry.split("/");
    return `${month}/20${year}`;
  };

  const onSubmit = async (data: CardData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token no encontrado");

      const accountAPI = new AccountAPI();
      const accountInfo = await accountAPI.getAccountInfo(token);
      const accountId = accountInfo.id;

      const existingCards = await cardService.getCardsByAccountId(accountId, token);
      if (existingCards.length >= 10) {
        Swal.fire({
          icon: "warning",
          title: "Límite alcanzado",
          text: "El máximo de tarjetas es 10. No puedes agregar más.",
          confirmButtonText: "Aceptar",
        });
        return;
      }

      const cardData = {
        cod: parseInt(data.cvc, 10),
        expiration_date: convertExpiryToFullYear(data.expiry),
        first_last_name: data.fullName,
        number_id: parseInt(data.cardNumber),
      };

      await cardService.createCard(accountId, cardData, token);
      Swal.fire({
        icon: "success",
        title: "Tarjeta creada con éxito",
        confirmButtonText: "Aceptar",
      }).then(() => {
        window.location.href = "/main/card1";
      });
    } catch (error) {
      console.error("Error al crear la tarjeta:", error);
      Swal.fire({
        icon: "error",
        title: "Error al crear la tarjeta",
        text: "Ocurrió un error. Inténtalo de nuevo.",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <div className="flex">
      <Menu />
      <main className="flex-1 p-2 sm:p-4 flex justify-center items-center bg-gray-100 min-h-screen">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8 w-full max-w-[95vw] sm:max-w-4xl">
          <h1 className="block text-xl sm:text-2xl font-bold mb-3 sm:mb-4 flex justify-center sm:hidden">Tarjetas</h1>
          
          <FormProvider {...methods}>
            <form className="flex flex-wrap gap-3 sm:gap-4 py-3 sm:py-4 justify-center" onSubmit={handleSubmit(onSubmit)}>
              <div className="w-full flex justify-center mb-6 sm:mb-8">
                <Cards 
                  cvc={cvc} 
                  expiry={expiry} 
                  name={name} 
                  number={cardNumber}
                  containerStyle={{
                    width: '100%',
                    maxWidth: '320px',
                    borderRadius: '10px'
                  }}
                />
              </div>

              <div className="w-full px-2 sm:px-0 sm:w-[360px]">
                <InputNumber 
                  type="number" 
                  fieldName="cardNumber" 
                  placeholder="Número de tarjeta*"
                  className="w-full h-[50px] sm:h-[64px] bg-white border border-gray-300 px-4 py-2 rounded-[10px] text-black text-[16px] sm:text-[18px]"
                />
              </div>
              
              <div className="w-full px-2 sm:px-0 sm:w-[360px]">
                <Controller
                  name="expiry"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      placeholder="Fecha de vencimiento (MM/YY)*"
                      value={formatExpiry(field.value || "")}
                      onChange={(e) => field.onChange(formatExpiry(e.target.value))}
                      className="w-full h-[50px] sm:h-[64px] bg-white border border-gray-300 px-4 py-2 rounded-[10px] text-black text-[16px] sm:text-[18px] mb-2"
                      maxLength={5}
                    />
                  )}
                />
              </div>
              
              <div className="w-full px-2 sm:px-0 sm:w-[360px]">
                <InputText 
                  type="text" 
                  fieldName="fullName" 
                  placeholder="Nombre y apellido*"
                  className="w-full h-[50px] sm:h-[64px] bg-white border border-gray-300 px-4 py-2 rounded-[10px] text-black text-[16px] sm:text-[18px]"
                />
              </div>
              
              <div className="w-full px-2 sm:px-0 sm:w-[360px]">
                <InputNumber 
                  type="number" 
                  fieldName="cvc" 
                  placeholder="Código de seguridad*"
                  className="w-full h-[50px] sm:h-[64px] bg-white border border-gray-300 px-4 py-2 rounded-[10px] text-black text-[16px] sm:text-[18px]"
                  maxLength={4}
                />
              </div>
              
              <div className="w-full px-2 sm:px-0 sm:w-[360px]">
                {errors.cardNumber && (
                  <div className="text-red-500 text-sm mt-2">{errors.cardNumber.message}</div>
                )}
                {errors.expiry && (
                  <div className="text-red-500 text-sm mt-2">{errors.expiry.message}</div>
                )}
                {errors.fullName && (
                  <div className="text-red-500 text-sm mt-2">{errors.fullName.message}</div>
                )}
                {errors.cvc && (
                  <div className="text-red-500 text-sm mt-2">{errors.cvc.message}</div>
                )}
              </div>
  
              <div className="w-full px-2 sm:px-0 sm:w-[360px] flex justify-center mt-4">
                <ContinueButton 
                  isEnabled={isValid} 
                  handleSubmit={handleSubmit(onSubmit)}
                  className="h-[50px] sm:h-[64px] text-[16px] sm:text-[18px]"
                />
              </div>
            </form>
          </FormProvider>
        </div>
      </main>
    </div>
  );
};

export default CardPage;