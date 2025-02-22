"use client";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputText from "@/app/components/inputs/InputText";
import InputNumber from "@/app/components/inputs/InputNumber";
import { cardScheme } from "../../yup/yup";
import Menu from "@/app/components/menu/menu";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import ContinueButton from "@/app/components/buttons/ContinueButton";
import AccountAPI from "../../../services/Account/account.service";
import cardService from "../../../services/cards/cards.service";
import Swal from "sweetalert2";

const CardPage = () => {
  const methods = useForm({
    resolver: yupResolver(cardScheme),
    mode: "onChange",
  });

  const { handleSubmit, watch, formState, control } = methods;
  const { isValid } = formState;

  const cardNumber = watch("cardNumber", "");
  const expiry = watch("expiry", "");
  const name = watch("fullName", "");
  const cvc = watch("cvc", "");

  const formatExpiry = (value) => {
    const cleanValue = value?.replace(/\D/g, "");
    if (cleanValue?.length <= 2) {
      return cleanValue;
    }
    return `${cleanValue?.slice(0, 2)}/${cleanValue?.slice(2, 4)}`;
  };

  const convertExpiryToFullYear = (expiry) => {
    const [month, year] = expiry.split("/");
    return `${month}/20${year}`;
  };

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token no encontrado");

      const accountAPI = new AccountAPI();
      const accountInfo = await accountAPI.getAccountInfo(token);
      const accountId = accountInfo.id;

      const existingCards = await cardService.getCardsByAccountId(
        accountId,
        token
      );
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
        window.location.href = "/card1";
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
      <main className="flex-1 p-4 flex justify-center items-center bg-gray-100 min-h-screen">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl">
        <h1 className="block text-2xl font-bold mb-4 flex justify-center sm:hidden">Tarjetas</h1>
          <FormProvider {...methods}>
            <form
              className="flex flex-wrap gap-4 py-4 justify-center"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="w-full flex justify-center mb-8">
                <Cards
                  cvc={cvc || ""}
                  expiry={expiry || ""}
                  name={name || ""}
                  number={cardNumber || ""}
                />
              </div>
              <InputNumber
                type="number"
                fieldName="cardNumber"
                placeholder="Número de tarjeta*"
              />
              <Controller
                name="expiry"
                control={control}
                render={({ field }) => {
                  const formattedValue = field.value
                    ? formatExpiry(field.value)
                    : "";
                  return (
                    <input
                      type="text"
                      placeholder="Fecha de vencimiento (MM/YY)*"
                      value={formattedValue}
                      onChange={(e) => {
                        const formattedInput = formatExpiry(e.target.value);
                        field.onChange(formattedInput);
                      }}
                      className="w-[300px] h-[50px] sm:w-[360px] sm:h-[64px] bg-white border border-gray-300 px-4 py-2 rounded-[10px] text-black text-[18px] mb-2"
                    />
                  );
                }}
              />
              <InputText
                type="text"
                fieldName="fullName"
                placeholder="Nombre y apellido*"
              />
              <InputNumber
                type="number"
                fieldName="cvc"
                placeholder="Código de seguridad*"
              />
              <div className="w-full flex justify-center mt-4">
                <ContinueButton
                  isEnabled={isValid}
                  handleSubmit={handleSubmit(onSubmit)}
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