"use client";
import React, { useEffect, useState } from "react";
import { ActivityServices } from "../api/activity/ActivityServices";
import { AccountServices } from "../api/account/AccountServices";

interface Transaction {
  id: number;
  description: string;
  amount: number;
  subtitle: string;
  destination:string,
  dated:string
}
interface AccountData {
  alias: string;
  available_amount: 0;
  cvu: string;
  id: 0;
  user_id: 0;
}

const Activity: React.FC = () => {

    const [transactionData, setTransactionData] = useState<Transaction[]>([]);
    const [accountData, setAccountData] = useState<AccountData | null>(null);
    
    const opciones = { weekday: "long" as "long" }; 

  useEffect(() => {
    ActivityServices.getActivityData()
      .then((data) => {
        setTransactionData(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
    setTransactionData(transactionData);

    AccountServices.getAccountData()
      .then((data) => {
        setAccountData(data);
      })
      .catch((error) => {
        console.error("Error fetching account data:", error);
      });
    setAccountData(accountData);
  }, []);

  const itemsPerPage = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTransactions = transactionData.filter((transaction) =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);


  return (
    <div className="bg-gray-100 min-h-screen p-4 flex justify-center items-start pt-8 w-full">
      <div className=" rounded-lg shadow-md w-full mx-12 p-4">
        {/* Barra de búsqueda y filtro */}
        <div className="flex items-center mb-6 ">
          <div className="relative flex-grow ">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
            <input
              style={{ boxShadow: "2px 2px 4px 2px #D3D3D3" }}
              type="text"
              placeholder="Buscar en tu actividad"
              className="pl-10 pr-4 py-2 bg-white rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            style={{ boxShadow: "2px 2px 4px 2px #D3D3D3" }}
            className="ml-2 bg-[#C1FD35] text-black px-4 py-2 rounded-md flex items-center"
          >
            Filtrar
            {/*<FilterIcon className="h-4 w-4 ml-2" />*/}
          </button>
        </div>

        {/* Lista de transacciones */}
        <div
          className="bg-white p-4 rounded"
          style={{ boxShadow: "2px 2px 2px 2px #D3D3D3" }}
        >
          <h2 className="font-semibold text-lg mb-4 border-b-1">
            Tu actividad
          </h2>

          <div className="space-y-4">
            {paginatedTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex justify-between items-cente border-b-1"
              >
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-[#C1FD35] mr-3"></div>
                  <span>{transaction.description == "Deposito de dinheiro"? "deposito de dinero": "Transfirio " }</span>
                </div>
                <div className="text-right">
                  <div className="font-medium">
                    ${" "}
                    {transaction.amount.toLocaleString("es-ES", {
                      minimumFractionDigits: 2,
                    })}
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date (transaction.dated).toLocaleDateString('es-ES', opciones)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Paginación */}
          <div className="flex justify-center mt-6">
            <nav className="flex space-x-1">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-8 h-8 flex items-center justify-center rounded-md ${
                    currentPage === index + 1
                      ? "bg-gray-200 font-medium"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;
