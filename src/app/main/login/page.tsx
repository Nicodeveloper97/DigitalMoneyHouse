"use client";
import React from "react";
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { emailSchema } from '../../yup/yup'; 
import InputText from '@/app/components/inputs/InputText';
import ContinueButton from '../../components/buttons/ContinueButton';
import CreateAccountButtonGray from '../../components/buttons/CreateAccountButtonGray';

type FormData = {
  email: string;
};

const LoginPage = () => {
  const methods = useForm({
    resolver: yupResolver(emailSchema),
    mode: 'onChange',
  });

  const { handleSubmit, formState } = methods;

  const onSubmit = (data: FormData) => {
    sessionStorage.setItem('email', data.email);
    window.location.href = '/login-password';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black text-white max-sm:px-4">
      <h1 className="text-2xl font-bold max-sm:text-xl max-sm:text-center max-sm:mb-4">¡Hola! Ingresá tu e-mail</h1>
      <FormProvider {...methods}>
        <form className="flex flex-col space-y-4 py-4 max-sm:w-full max-sm:px-2" onSubmit={handleSubmit(onSubmit)}>
          <InputText
            type="email"
            placeholder="Correo electrónico"
            fieldName="email"
          />
          {formState.errors.email && (
            <p className="text-red-500 max-sm:text-sm">{formState.errors.email.message}</p>
          )}
          <ContinueButton isEnabled={formState.isValid} />
          <CreateAccountButtonGray />
        </form>
      </FormProvider>
    </div>
  );
};

export default LoginPage;