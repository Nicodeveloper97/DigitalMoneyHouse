"use client";
import React, { useEffect, useState } from 'react';
import { ServiceAPI } from '../../services/services/service.service'; 
import Menu from '@/app/components/menu/menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faSearch } from '@fortawesome/free-solid-svg-icons';

const ServicePage = () => {
  const [services, setServices] = useState<{ id: number, name: string, date: string }[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Obtener los servicios cuando se carga el componente
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await ServiceAPI.getAllServiceIds();
        console.log('Response from API: ', response);
        // Ordena los servicios por fecha de manera descendente
        const sortedServices = response.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setServices(sortedServices);
      } catch (error) {
        console.error('Error fetching services', error);
      }
    };
    fetchServices();
  }, []);

  // Filtrar los servicios según la búsqueda
  const filteredServices = services.filter(service =>
    service?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Función para redirigir al usuario
  const handleSelectService = (serviceName: string) => {
    // Reemplaza los espacios en el nombre del servicio con guiones bajos o %20 si prefieres
    const encodedServiceName = encodeURIComponent(serviceName);
    window.location.href = `/services2?name=${encodedServiceName}`;
  };

  return (
    <div className="flex">
      <Menu />
      <main className="flex-1 p-4 flex flex-col items-center mt-8 min-h-screen">
        <h1 className="block text-2xl font-bold mb-4 sm:hidden">Pagar servicios</h1>

        {/* Barra de búsqueda con ícono de lupa */}
        <div className="w-full max-w-xl mb-6 relative">
          <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            className="w-full px-10 py-2 border border-gray-300 rounded-lg shadow-sm"
            placeholder="Buscá entre más de 5,000 empresas"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Lista de servicios filtrados */}
        <div className="w-full max-w-xl bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-bold mb-4">Más recientes</h2>
          <ul>
            {filteredServices.map((service) => (
              <li key={service.id} className="flex justify-between items-center py-2 border-b">
                <div className="flex items-center space-x-3">
                  {/* Icono de FontAwesome */}
                  <FontAwesomeIcon icon={faBuilding} className="text-gray-500" />
                  <span>{service.name}</span>
                </div>
                {/* Botón para seleccionar el servicio */}
                <button 
                  className="text-blue-600"
                  onClick={() => handleSelectService(service.name)} // Llama a la función con el nombre del servicio
                >
                  Seleccionar
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default ServicePage;