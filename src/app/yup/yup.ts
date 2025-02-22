import * as yup from "yup";

  export const emailSchema = yup
  .object({
    email: yup
      .string()
      .email("El formato del email es inválido. Ejemplo: email@gmail.com")
      .required("Completá los campos requeridos."),
  })
  .required();
  
  export const passwordSchema = yup
  .object({
    password: yup
      .string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .max(20, 'La contraseña no puede tener más de 20 caracteres')
      .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/, 'La contraseña debe contener al menos 1 carácter especial, una mayúscula y un número')
      .required('La contraseña es obligatoria'),
  })
  .required();

  const nameSchema = yup
  .string()
  .matches(/^[A-Za-z]+$/, "El campo debe contener solo letras")
  .required("Completá los campos requeridos.");

// Esquema de validación para DNI y teléfono (opcional)
const optionalPhoneSchema = yup
  .string()
  .matches(/^\d+$/, "El teléfono debe contener solo números")
  .optional();

// Esquema de validación para el registro
export const signupSchema = yup
  .object({
    firstname: nameSchema,
    lastname: nameSchema,
    dni: yup.number().required("Completá los campos requeridos."),
    email: yup
      .string()
      .email("El formato del email es inválido. Ejemplo: email@gmail.com")
      .required("Completá los campos requeridos."),
    password: yup
      .string()
      .min(6, "La contraseña debe tener 6 caracteres como mínimo.")
      .max(20)
      .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/, "La contraseña debe contener al menos 1 carácter especial, una mayúscula y un número")
      .required("La contraseña es obligatoria."),
    passwordConfirmed: yup
      .string()
      .oneOf([yup.ref("password")], "Las contraseñas no coinciden.")
      .required("Completá los campos requeridos."),
    phone: optionalPhoneSchema,
  })
  .required();

export const cardScheme = yup
  .object({
    cardNumber: yup
      .string()
      .matches(
        /^\d{13,19}$/,
        "El número de tarjeta debe tener entre 13 y 19 dígitos."
      )
      .required("Completá los campos requeridos."),
    expiry: yup
      .string()
      .matches(
        /^(0[1-9]|1[0-2])\/\d{2}$/,
        "El formato de vencimiento debe ser MM/YY, con 2 dígitos para el mes y 2 dígitos para el año."
      )
      .required("Completá los campos requeridos."),
    fullName: yup
      .string()
      .matches(
        /^[A-Za-zÀ-ÖØ-Ýà-öø-ÿÑñ\s]*$/,
        "El campo debe contener solo letras y espacios."
      )
      .required("Completá los campos requeridos."),
    cvc: yup
      .string()
      .matches(/^\d{3}$/, "El código de seguridad debe tener 3 dígitos.")
      .required("Completá los campos requeridos."),
  })
  .required();