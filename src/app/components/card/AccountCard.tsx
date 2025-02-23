"use client";
import React, { useEffect, useState } from 'react';
import UserAPI from '../../services/users/users.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faSave } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

interface User {
  id?: number;
  dni: number;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  phone: string;
}

const AccountCard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
        const username = decodedPayload.username || decodedPayload.id;

        if (!username) {
          setError('Username no encontrado en el token');
          setLoading(false);
          return;
        }

        UserAPI.getUserData(token, username)
          .then((data) => {
            setUser(data);
            setEditedUser(data); 
            setLoading(false);
          })
          .catch(() => {
            setError('Error al obtener los datos del usuario');
            setLoading(false);
          });
      } catch (err) {
        setError('Error al decodificar el token');
        setLoading(false);
      }
    } else {
      setError('Token no encontrado en el localStorage');
      setLoading(false);
    }
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!editedUser || !user || !user.id) {
      Swal.fire('Error', 'No se puede guardar sin un ID de usuario válido', 'error');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire('Error', 'Token no encontrado', 'error');
      return;
    }

    try {
      await UserAPI.updateUserData(token, user.id, editedUser);
      setUser(editedUser); // Sincroniza el estado user con los datos editados
      setIsEditing(false);
      Swal.fire({
        title: 'Actualizado',
        text: 'Tus datos han sido actualizados',
        icon: 'success',
      }).then(() => {
        window.location.reload(); // Recarga la página para reflejar los cambios
      });
    } catch (error) {
      Swal.fire('Error', 'No se pudieron actualizar los datos', 'error');
    }
  };

  const renderEditSaveIcon = (field: keyof User) => (
    <FontAwesomeIcon
      icon={isEditing ? faSave : faPen}
      className="text-custom-dark cursor-pointer"
      onClick={isEditing ? handleSave : handleEdit}
    />
  );

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mx-auto bg-white rounded-lg shadow-lg p-6 w-full max-w-[350px] sm:max-w-[511px] lg:max-w-[1003px] rounded-[10px] border border-gray-300">
      <h2 className="text-xl font-bold mb-4">Tus datos</h2>
      <div className="space-y-2">
        <div className="flex items-center gap-x-2">
          <label className="text-gray-700">Email:</label>
          <div className="flex-1">
            {isEditing ? (
              <input
                type="text"
                className="border border-gray p-2 rounded-lg w-full"
                value={editedUser?.email}
                onChange={(e) =>
                  setEditedUser({ ...editedUser!, email: e.target.value })
                }
              />
            ) : (
              <p className="text-black-opacity-50">{user?.email}</p>
            )}
          </div>
          {renderEditSaveIcon("email")}
        </div>
        <div className="flex items-center gap-x-2">
          <label className="text-gray-700">Nombre:</label>
          <div className="flex-1">
            {isEditing ? (
              <input
                type="text"
                className="border border-gray p-2 rounded-lg w-full"
                value={editedUser?.firstname}
                onChange={(e) =>
                  setEditedUser({ ...editedUser!, firstname: e.target.value })
                }
              />
            ) : (
              <p className="text-black-opacity-50">{user?.firstname}</p>
            )}
          </div>
          {renderEditSaveIcon("firstname")}
        </div>
        <div className="flex items-center gap-x-2">
          <label className="text-gray-700">Apellido:</label>
          <div className="flex-1">
            {isEditing ? (
              <input
                type="text"
                className="border border-gray p-2 rounded-lg w-full"
                value={editedUser?.lastname}
                onChange={(e) =>
                  setEditedUser({ ...editedUser!, lastname: e.target.value })
                }
              />
            ) : (
              <p className="text-black-opacity-50">{user?.lastname}</p>
            )}
          </div>
          {renderEditSaveIcon("lastname")}
        </div>
        <div className="flex items-center gap-x-2">
          <label className="text-gray-700">Teléfono:</label>
          <div className="flex-1">
            {isEditing ? (
              <input
                type="text"
                className="border border-gray p-2 rounded-lg w-full"
                value={editedUser?.phone}
                onChange={(e) =>
                  setEditedUser({ ...editedUser!, phone: e.target.value })
                }
              />
            ) : (
              <p className="text-black-opacity-50">{user?.phone}</p>
            )}
          </div>
          {renderEditSaveIcon("phone")}
        </div>
        <div className="flex gap-x-2 items-center">
          <label className="text-gray-700">DNI:</label>
          <p>{user?.dni}</p>
        </div>
      </div>
    </div>
  );
};

export default AccountCard;
