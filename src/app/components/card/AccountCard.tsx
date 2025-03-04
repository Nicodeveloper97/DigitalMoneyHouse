"use client";
import React, { useEffect, useState } from "react";
import UserAPI from "../../services/users/users.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faSave } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

interface User {
  id?: number;
  dni: number;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  phone: string;
}

const EditableField = ({
  label,
  value,
  isEditing,
  onChange,
  onSave,
}: {
  label: string;
  value: string | number | undefined;
  isEditing: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
}) => (
  <div className="flex items-center gap-x-2">
    <label className="text-gray-700">{label}:</label>
    <div className="flex-1">
      {isEditing ? (
        <input
          type="text"
          className="border border-gray p-2 rounded-lg w-full"
          value={value}
          onChange={onChange}
        />
      ) : (
        <p className="text-black-opacity-50">{value}</p>
      )}
    </div>
    <FontAwesomeIcon
      icon={isEditing ? faSave : faPen}
      className="text-custom-dark cursor-pointer"
      onClick={onSave}
    />
  </div>
);

const AccountCard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User | null>(null);
  const [fullname, setFullname] = useState(""); // Nuevo estado para el nombre completo

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = token.split(".")[1];
        const decodedPayload = JSON.parse(
          atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
        );
        const username = decodedPayload.username || decodedPayload.id;

        if (!username) {
          setError("Username no encontrado en el token");
          setLoading(false);
          return;
        }

        UserAPI.getUserData(token, username)
          .then((data) => {
            setUser(data);
            setEditedUser(data);
            setFullname(`${data.firstname} ${data.lastname}`); // Combinar nombre y apellido
            setLoading(false);
          })
          .catch(() => {
            setError("Error al obtener los datos del usuario");
            setLoading(false);
          });
      } catch {
        setError("Error al decodificar el token");
        setLoading(false);
      }
    } else {
      setLoading(false);
      setError("Token no encontrado en el localStorage");
    }
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!editedUser || !user?.id) {
      Swal.fire("Error", "No se puede guardar sin un ID de usuario válido", "error");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire("Error", "Token no encontrado", "error");
      return;
    }

    // Separar el nombre completo en firstname y lastname
    const [firstname, lastname] = fullname.split(" ");
    const updatedUser = { ...editedUser, firstname, lastname };

    try {
      await UserAPI.updateUserData(token, user.id, updatedUser);
      setUser(updatedUser);
      setEditedUser(updatedUser);
      setIsEditing(false);
      Swal.fire({
        title: "Actualizado",
        text: "Tus datos han sido actualizados",
        icon: "success",
      }).then(() => {
        window.location.reload();
      });
    } catch {
      Swal.fire("Error", "No se pudieron actualizar los datos", "error");
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mx-auto bg-white rounded-lg shadow-lg p-6 w-full max-w-[350px] sm:max-w-[511px] lg:max-w-[1003px] rounded-[10px] border border-gray-300">
      <h2 className="text-xl font-bold mb-4">Tus datos</h2>
      <div className="space-y-2">
        <EditableField
          label="Email"
          value={editedUser?.email}
          isEditing={isEditing}
          onChange={(e) => setEditedUser({ ...editedUser!, email: e.target.value })}
          onSave={isEditing ? handleSave : handleEdit}
        />
        <EditableField
          label="Nombre completo"
          value={fullname}
          isEditing={isEditing}
          onChange={(e) => setFullname(e.target.value)} // Actualizar el nombre completo
          onSave={isEditing ? handleSave : handleEdit}
        />
        <EditableField
          label="Teléfono"
          value={editedUser?.phone}
          isEditing={isEditing}
          onChange={(e) => setEditedUser({ ...editedUser!, phone: e.target.value })}
          onSave={isEditing ? handleSave : handleEdit}
        />
        <div className="flex gap-x-2 items-center">
          <label className="text-gray-700">DNI:</label>
          <p>{user?.dni}</p>
        </div>
      </div>
    </div>
  );
};

export default AccountCard;