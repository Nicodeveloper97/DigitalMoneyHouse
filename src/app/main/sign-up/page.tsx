"use client";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "../../yup/yup";
import InputText from "@/app/components/inputs/InputText";
import InputNumber from "@/app/components/inputs/InputNumber";
import SignUpButton from "@/app/components/buttons/SignUpButton";
import userApi from "../../services/users/users.service"; 
import { useState } from "react";
import { UserType } from "@/app/types/user.types";
import Swal from "sweetalert2";  
import { useRouter } from "next/navigation"; 

const SignUpPage = () => {
  const router = useRouter();
  const methods = useForm({
    resolver: yupResolver(signupSchema),
    mode: "onChange",
  });

  const { handleSubmit, formState, setError } = methods;
  const isFormValid = formState.isValid;

  const onSubmit = async (data: UserType) => {
    try {
      console.log("Enviando datos de registro:", data);

      const response = await userApi.newUser(data);

      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: '¡Usuario creado exitosamente!',
          text: 'Serás redirigido al login.',
          confirmButtonColor: '#3085d6',
        }).then(() => {
          router.push("/login"); 
        });
      } else {
        throw new Error(response.message || "Error inesperado");
      }
    } catch (error: any) {
      console.error("Error capturado:", error);

      if (error.response?.status === 409) {
        setError("email", { type: "manual", message: "El email ya está en uso." });
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El email ya está en uso.',
          confirmButtonColor: '#d33',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al crear el usuario: ' + error.message,
          confirmButtonColor: '#d33',
        });
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black text-white">
      <h1 className="text-2xl font-bold">Crear Cuenta</h1>
      <FormProvider {...methods}>
        <form className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-2 pl-[3%] sm:pl-0" onSubmit={handleSubmit(onSubmit)}>
          <InputText type="text" placeholder="Nombre*" fieldName="firstname" />
          <InputText type="text" placeholder="Apellido*" fieldName="lastname" />
          <InputNumber type="number" placeholder="DNI*" fieldName="dni" />
          <InputText type="email" placeholder="Email*" fieldName="email" />
          <div className="col-span-1 sm:col-span-2">
            <p className="w-[300px] sm:w-auto">
              Usa entre 6 y 20 caracteres (debe contener al menos 1 carácter especial, una mayúscula y un número)
            </p>
          </div>
          <InputText type="password" placeholder="Contraseña*" fieldName="password" />
          <InputText type="password" placeholder="Confirmar contraseña*" fieldName="passwordConfirmed" />
          <InputNumber type="number" placeholder="Teléfono" fieldName="phone" />
          <SignUpButton isEnabled={isFormValid} />

          
          {Object.entries(formState.errors).map(([key, error]) => (
            <p key={key} className="text-red-500 col-span-1 sm:col-span-2">
              {error.message}
            </p>
          ))}
        </form>
      </FormProvider>
    </div>
  );
};

export default SignUpPage;
