export type UserType = {
  dni: number;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  phone?: string; // Ahora opcional para evitar errores con undefined
};

export type UserData = {
  user_id: number;
  account_id: number;
  email: string;
  status?: number;  // Agregado si la API lo devuelve
  message?: string; // Agregado si la API lo devuelve
};

export type UserLoginType = {
  email: string;
  password: string;
};
