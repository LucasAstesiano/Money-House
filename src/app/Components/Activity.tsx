import React, { useEffect, useState } from "react";
import { ActivityServices } from "../api/activity/ActivityServices";
import { AccountServices } from "../api/account/AccountServices";
import TransactionType from "../interfaces/TransactionType";
import AccountDataType from "../interfaces/AccountType";
import { useRouter } from "next/navigation";

const Activity: React.FC<{ ShowButton: boolean }> = ({ ShowButton = false }) => {
  const router = useRouter();
  const [transactionData, setTransactionData] = useState<TransactionType[]>([]);
  const [accountData, setAccountData] = useState<AccountDataType | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterPeriod, setFilterPeriod] = useState<string>(""); // Estado para el período seleccionado
  const [filterType, setFilterType] = useState<string>("all"); // Estado para el tipo de operación
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Controla el menú desplegable de período
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false); // Controla el menú desplegable de tipo de operación

  const itemsPerPage = 10;

  useEffect(() => {
    ActivityServices.getActivityData()
      .then((data) => {
        const sortedData = data.sort(
          (a: TransactionType, b: TransactionType) =>
            new Date(b.dated).getTime() - new Date(a.dated).getTime()
        );
        setTransactionData(sortedData);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });

    AccountServices.getAccountData()
      .then((data) => {
        setAccountData(data);
        console.log(accountData);
        
      })
      .catch((error) => {
        console.error("Error fetching account data:", error);
      });
  }, []);

  // Función para filtrar transacciones por período y tipo
  const filterByPeriodAndType = (transactions: TransactionType[]) => {
    const now = new Date();
    return transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.dated);

      // Filtrar por período
      const matchesPeriod = (() => {
        switch (filterPeriod) {
          case "today":
            return transactionDate.toDateString() === now.toDateString();
          case "yesterday":
            const yesterday = new Date();
            yesterday.setDate(now.getDate() - 1);
            return transactionDate.toDateString() === yesterday.toDateString();
          case "lastWeek":
            const lastWeek = new Date();
            lastWeek.setDate(now.getDate() - 7);
            return transactionDate >= lastWeek;
          case "last15Days":
            const last15Days = new Date();
            last15Days.setDate(now.getDate() - 15);
            return transactionDate >= last15Days;
          case "lastMonth":
            const lastMonth = new Date();
            lastMonth.setMonth(now.getMonth() - 1);
            return transactionDate >= lastMonth;
          case "last3Months":
            const last3Months = new Date();
            last3Months.setMonth(now.getMonth() - 3);
            return transactionDate >= last3Months;
          default:
            return true; // Sin filtro
        }
      })();

      // Filtrar por tipo de operación
      const matchesType =
        filterType === "all" ||
        (filterType === "income" && transaction.amount > 0) ||
        (filterType === "expense" && transaction.amount < 0);

      return matchesPeriod && matchesType;
    });
  };

  // Aplicar filtro de búsqueda, período y tipo
  const filteredTransactions = filterByPeriodAndType(
    transactionData.filter((transaction) =>
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  return (
    <div className="bg-[#f0f0f0] min-h-screen p-4 flex justify-center items-start pt-8 w-full">
      <div className="rounded-lg shadow-md w-full md:mx-12 p-4">
        {/* Barra de búsqueda y filtros */}
        <div className="flex items-center mb-6">
          <div className="relative flex-grow">
            <input
              style={{ boxShadow: "2px 2px 4px 2px #D3D3D3" }}
              type="text"
              placeholder="🔍︎ Buscar en tu actividad"
              className="pl-10 pr-4 py-2 bg-white rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Menú desplegable de período */}
          <div className="relative">
            <button
              style={{ boxShadow: "2px 2px 4px 2px #D3D3D3" }}
              className="ml-2 bg-[#C1FD35] text-black px-4 py-2 rounded-md"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Período
            </button>
            {isDropdownOpen && (
              <div
                className="absolute bg-white shadow-md rounded-md mt-2 w-48 z-10"
                style={{ boxShadow: "2px 2px 4px 2px #D3D3D3" }}
              >
                <ul>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setFilterPeriod("today")}
                  >
                    Hoy
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setFilterPeriod("yesterday")}
                  >
                    Ayer
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setFilterPeriod("lastWeek")}
                  >
                    Última semana
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setFilterPeriod("last15Days")}
                  >
                    Últimos 15 días
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setFilterPeriod("lastMonth")}
                  >
                    Último mes
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setFilterPeriod("last3Months")}
                  >
                    Últimos 3 meses
                  </li>
                </ul>
                <button
                  className="w-full bg-[#C1FD35] text-black px-4 py-2 rounded-b-md"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    setCurrentPage(1); // Reiniciar a la primera página
                  }}
                >
                  Aplicar
                </button>
              </div>
            )}
          </div>

          {/* Menú desplegable de tipo de operación */}
          <div className="relative">
            <button
              style={{ boxShadow: "2px 2px 4px 2px #D3D3D3" }}
              className="ml-2 bg-[#C1FD35] text-black px-4 py-2 rounded-md"
              onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
            >
              Tipo
            </button>
            {isTypeDropdownOpen && (
              <div
                className="absolute bg-white shadow-md rounded-md mt-2 w-48 z-10"
                style={{ boxShadow: "2px 2px 4px 2px #D3D3D3" }}
              >
                <ul>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setFilterType("all")}
                  >
                    Todos
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setFilterType("income")}
                  >
                    Ingresos
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setFilterType("expense")}
                  >
                    Egresos
                  </li>
                </ul>
                <button
                  className="w-full bg-[#C1FD35] text-black px-4 py-2 rounded-b-md"
                  onClick={() => {
                    setIsTypeDropdownOpen(false);
                    setCurrentPage(1); // Reiniciar a la primera página
                  }}
                >
                  Aplicar
                </button>
              </div>
            )}
          </div>
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
                  <span>
                    {transaction.description === "Deposito de dinheiro"
                      ? "Depósito de dinero"
                      : "Transfirió "}
                  </span>
                </div>
                <div className="text-right">
                  <div className="font-medium">
                    ${" "}
                    {transaction.amount.toLocaleString("es-ES", {
                      minimumFractionDigits: 2,
                    })}
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(transaction.dated).toLocaleDateString(
                      "es-ES",
                      { weekday: "long" }
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Paginación */}
          <div className="flex justify-center mt-6">
            {!ShowButton && (
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
            )}
          </div>
          {ShowButton && (
            <button
              className="md:bg-[#C1FD35] text-black py-2 px-4 rounded mt-4 flex cursor-pointer"
              onClick={() => router.push("/main/actividad")}
            >
              Ver toda tu actividad <span className="md:hidden block"> →</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Activity;