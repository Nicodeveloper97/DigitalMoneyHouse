'use client';
import React from "react";
import { useForm, FormProvider, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { passwordSchema } from '../../yup/yup';
import InputText from '@/app/components/inputs/InputText';
import ContinueButton from '../../components/buttons/ContinueButton';

const LoginPasswordPage = () => {
  const methods = useForm({
    resolver: yupResolver(passwordSchema),
    mode: 'onChange',
  });

  const { formState, control } = methods;
  const passwordValue = useWatch({ control, name: 'password' });
  const isPasswordValid = formState.isValid && passwordValue !== '';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black text-white max-sm:px-4">
      <h1 className="text-2xl font-bold max-sm:text-xl max-sm:text-center max-sm:mb-4">Ingresá tu contraseña</h1>
      <FormProvider {...methods}>
        <form className="flex flex-col space-y-4 py-4 max-sm:w-full" onSubmit={(e) => e.preventDefault()}>
          <InputText
            type="password"
            placeholder="Contraseña"
            fieldName="password"
          />
          {formState.errors.password && (
            <p className="text-red-500 text-[15px] w-[360px] max-sm:w-full max-sm:text-sm max-sm:px-2">
              {formState.errors.password.message}
            </p>
          )}
          <ContinueButton isEnabled={isPasswordValid} />
        </form>
      </FormProvider>
    </div>
  );
};

export default LoginPasswordPage;