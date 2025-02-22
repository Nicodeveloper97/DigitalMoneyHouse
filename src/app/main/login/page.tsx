"use client";
import React from "react";
import { useForm, FormProvider, useWatch, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { emailSchema } from "../../yup/yup";
import InputText from "@/app/components/inputs/InputText";
import ContinueButton from "../../components/buttons/ContinueButton";
import CreateAccountButtonGray from "../../components/buttons/CreateAccountButtonGray";

interface LoginForm {
  email: string;
}

const LoginPage = () => {
  const methods = useForm<LoginForm>({
    resolver: yupResolver(emailSchema),
    mode: "onChange",
  });

  const { handleSubmit, formState, control } = methods;
  const emailValue = useWatch({ control, name: "email" });
  const isEmailValid = !formState.errors.email && emailValue?.includes("@") && emailValue !== "";

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    sessionStorage.setItem("email", data.email);
    window.location.href = "/main/login-password"; 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black text-white">
      <h1 className="text-2xl font-bold">¡Hola! Ingresá tu e-mail</h1>
      <FormProvider {...methods}>
        <form className="flex flex-col space-y-4 py-4" onSubmit={handleSubmit(onSubmit)}>
          <InputText type="email" placeholder="Correo electrónico" fieldName="email" />
          {formState.errors.email && <p className="text-red-500">{formState.errors.email.message}</p>}
          <ContinueButton isEnabled={isEmailValid} />
          <CreateAccountButtonGray />
        </form>
      </FormProvider>
    </div>
  );
};

export default LoginPage;
