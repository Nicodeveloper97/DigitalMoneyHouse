"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFilter, faTimes, faListUl, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import AccountAPI from "../../services/Account/account.service";
import { transactionsAPI } from "../../services/transaction/transactions.service";

interface Activity {
  id: number;
  description: string;
  dated: string;
  amount: number;
  type: "income" | "expense"; 
}

const ActivityList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>(() => {
    return localStorage.getItem('activitySearchTerm') || "";
  });
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isClient, setIsClient] = useState(false);
  const [path, setPath] = useState("");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [transactionTypeFilter, setTransactionTypeFilter] = useState<"all" | "income" | "expense">("all");

  useEffect(() => {
    if (localStorage.getItem('activitySearchTerm')) {
      localStorage.removeItem('activitySearchTerm');
    }
  }, []);

  useEffect(() => {
    setIsClient(true);
    setPath(window.location.pathname);
  }, []);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token no encontrado");
        const { id: accountId } = await new AccountAPI().getAccountInfo(token);
        let transactions: Activity[] = await transactionsAPI.getAllTransactions(accountId);

        // Ordenar transacciones por fecha (más recientes primero)
        transactions = transactions.sort((a: Activity, b: Activity) => 
          new Date(b.dated).getTime() - new Date(a.dated).getTime()
        );

        setActivities(transactions);
        setFilteredActivities(transactions); 
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchActivities();
  }, []);

  useEffect(() => {
    let filtered = activities;

    
    if (selectedFilter) {
      filtered = applyDateFilter(filtered, selectedFilter);
    }

    
    if (transactionTypeFilter !== "all") {
      filtered = filtered.filter(({ type }) => type === transactionTypeFilter);
    }

    
    filtered = filtered.filter(({ description }) =>
      description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredActivities(filtered);
    setCurrentPage(1); 
  }, [searchTerm, activities, selectedFilter, transactionTypeFilter]);

  const applyDateFilter = (transactions: Activity[], filter: string) => {
    const now = new Date();
    let startDate: Date;
    let endDate = new Date();

    switch (filter) {
      case "hoy":
        startDate = new Date(now.setHours(0, 0, 0, 0));
        endDate = new Date(now.setHours(23, 59, 59, 999));
        break;
      case "ayer":
        startDate = new Date(now.setDate(now.getDate() - 1));
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date(now);
        endDate.setHours(23, 59, 59, 999);
        break;
      case "ultima-semana":
        startDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case "ultimos-15 dias":
        startDate = new Date(now.setDate(now.getDate() - 15));
        break;
      case "ultimo-mes":
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        break;
      case "ultimos-3 meses":
        startDate = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
        break;
      default:
        startDate = new Date(0); 
    }

    return transactions.filter(
      ({ dated }) => new Date(dated) >= startDate && new Date(dated) <= endDate
    );
  };

  const indexOfLastActivity = currentPage * itemsPerPage;
  const currentActivities =
    path === "/home"
      ? filteredActivities.slice(0, itemsPerPage)
      : filteredActivities.slice(indexOfLastActivity - itemsPerPage, indexOfLastActivity);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleActivityClick = (activityId: number) => {
    localStorage.setItem("selectedTransactionId", activityId.toString());
    window.location.href = "/main/activity2";
  };

  const toggleFilterMenu = () => setShowFilterMenu(!showFilterMenu);
  
  const applyFilter = () => {
    const selectedOption = document.querySelector('input[name="filter"]:checked')?.id;
    setSelectedFilter(selectedOption || "");
    const selectedType = document.querySelector('input[name="typeFilter"]:checked')?.id as "all" | "income" | "expense";
    setTransactionTypeFilter(selectedType || "all");
    setShowFilterMenu(false);
  };
  
  const clearFilters = () => {
    setSelectedFilter("");
    setTransactionTypeFilter("all");
    setFilteredActivities(activities);
    setSearchTerm("");
    setShowFilterMenu(false);
  };

  const clearDateFilter = () => {
    setSelectedFilter("");
  };

  const clearTypeFilter = () => {
    setTransactionTypeFilter("all");
  };

  const handleShowMore = () => {
    window.location.href = "/main/activity";
  };

  const handleViewAllActivity = () => {
    window.location.href = "/main/activity";
  };

  const handleSearchEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim() !== '') {
      if (path !== "/main/activity") {
        localStorage.setItem('activitySearchTerm', searchTerm.trim());
        window.location.href = "/main/activity";
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mt-4 w-full max-w-[350px] sm:max-w-[511px] lg:max-w-[1006px]">
      <div className="relative flex items-center mb-4">
        <FontAwesomeIcon icon={faSearch} className="absolute left-3 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar en tu actividad"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearchEnter}
          className="w-full border border-gray-300 rounded-[10px] pl-12 pr-4"
        />
        {isClient && path === "/main/activity" && (
          <button onClick={toggleFilterMenu} className="ml-4 px-4 py-2 bg-lime-500 text-black rounded-[10px] flex items-center">
            <span className="mr-2 font-bold">Filtrar</span>
            <FontAwesomeIcon icon={faFilter} />
          </button>
        )}
      </div>

      {showFilterMenu && (
        <div className="bg-gray-100 p-4 rounded-lg shadow-lg mt-4">
          <h3 className="text-lg font-semibold mb-2">Filtrar por período</h3>
          <ul className="space-y-2">
            {["hoy", "ayer", "ultima-semana", "ultimos-15 dias", "ultimo-mes", "ultimos-3 meses"].map((filter) => (
              <li key={filter}>
                <input type="radio" id={filter} name="filter" />
                <label htmlFor={filter} className="ml-2 capitalize">
                  {filter.replace("-", " ")}
                </label>
              </li>
            ))}
          </ul>
          <h3 className="text-lg font-semibold mt-4 mb-2">Filtrar por tipo</h3>
          <ul className="space-y-2">
            {["all", "income", "expense"].map((type) => (
              <li key={type}>
                <input type="radio" id={type} name="typeFilter" />
                <label htmlFor={type} className="ml-2 capitalize">
                  {type === "all" ? "Todos" : type === "income" ? "Ingresos" : "Egresos"}
                </label>
              </li>
            ))}
          </ul>
          <button onClick={applyFilter} className="mt-4 px-4 py-2 bg-lime-500 text-black rounded-[10px]">
            Aplicar
          </button>
          <button onClick={clearFilters} className="mt-2 ml-4 px-4 py-2 bg-red-500 text-black rounded-[10px]">
            <FontAwesomeIcon icon={faTimes} className="mr-2" /> Borrar filtros
          </button>
        </div>
      )}

      
      <div className="flex flex-wrap gap-2 mt-4">
        {selectedFilter && (
          <button onClick={clearDateFilter} className="px-3 py-1 bg-gray-200 rounded-full flex items-center">
            <span>{selectedFilter.replace("-", " ")}</span>
            <FontAwesomeIcon icon={faTimes} className="ml-2" />
          </button>
        )}
        {transactionTypeFilter !== "all" && (
          <button onClick={clearTypeFilter} className="px-3 py-1 bg-gray-200 rounded-full flex items-center">
            <span>{transactionTypeFilter === "income" ? "Ingresos" : "Egresos"}</span>
            <FontAwesomeIcon icon={faTimes} className="ml-2" />
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-4 w-full mt-6">
        <h2 className="text-lg font-semibold mb-4">Tu actividad</h2>
        {filteredActivities.length === 0 ? (
          <p className="text-center text-gray-500">No se encontraron transacciones con los filtros aplicados.</p>
        ) : (
          <ul className="space-y-4">
            {currentActivities.map(({ id, description, amount, dated, type }, index) => (
              <li key={index} className="flex justify-between items-center cursor-pointer" onClick={() => handleActivityClick(id)}>
                <div className="flex items-center">
                  <span className={`w-4 h-4 rounded-full mr-2 ${type === "income" ? "bg-green-500" : "bg-red-500"}`}></span>
                  <span>{description}</span>
                </div>
                <div className="text-right">
                  <span>${amount.toFixed(2)}</span>
                  <div className="text-sm text-gray-500">{new Date(dated).toLocaleDateString()}</div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {isClient && path === "/home" && filteredActivities.length > itemsPerPage * currentPage && (
          <button onClick={handleShowMore} className="mt-4 w-full px-4 py-2 bg-lime-500 text-black rounded-[10px]">
            Ver más
          </button>
        )}

        {isClient && path === "/main/activity" && Math.ceil(filteredActivities.length / itemsPerPage) > 1 && (
          <div className="flex justify-center mt-4">
            {Array.from({ length: Math.ceil(filteredActivities.length / itemsPerPage) }, (_, i) => (
              <button
                key={i + 1}
                className={`mx-1 px-3 py-1 rounded-md ${i + 1 === currentPage ? "bg-lime-500 text-black" : "bg-gray-300 text-gray-600"}`}
                onClick={() => paginate(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

        <button 
          onClick={handleViewAllActivity} 
          className="mt-4 w-full px-4 py-2 text-black rounded-[10px] flex items-center justify-between"
        >
          <span>Ver toda tu actividad</span>
          <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default ActivityList;