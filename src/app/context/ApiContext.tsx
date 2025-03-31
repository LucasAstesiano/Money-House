'use client'
import { createContext, useReducer, ReactNode } from "react";
import UserType from "../interfaces/UserType";
import AccountDataType from "../interfaces/AccountType";
import CardType from "../interfaces/CardType";
import TransactionType from "../interfaces/TransactionType";

// Definir tipos
type StateType = {
    users: UserType[]; // Cambiado a un array para reflejar múltiples usuarios
    accounts: AccountDataType; // Cambiado a un array para reflejar múltiples cuentas
    cards: CardType[]; // Corregido el nombre a minúscula y cambiado a un array
    transactions: TransactionType[]; // Corregido el nombre a minúscula y cambiado a un array
};

type ActionType =
  | { type: "SET_USERS"; payload: UserType[] }
  | { type: "SET_ACCOUNTS"; payload: AccountDataType[] }
  | { type: "SET_CARDS"; payload: CardType[]}
  | { type: "SET_TRANSACTION"; payload: TransactionType[] };

// Estado inicial
const initialState: StateType = {
    users: [],
    accounts: [],
    cards: [],
    transactions: [],
};

// Reducer para manejar el estado
const apiReducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case "SET_USERS":
      return { ...state, users: action.payload };
    case "SET_ACCOUNTS":
    return { ...state, accounts: action.payload };
    case "SET_CARDS":
    return { ...state, cards: action.payload };
    case "SET_TRANSACTION":
    return { ...state, transactions: action.payload };
    default:
      return state;
  }
};

// Crear el contexto
const ApiContext = createContext<
  { state: StateType; dispatch: React.Dispatch<ActionType> } | undefined
>(undefined);

// Proveedor del contexto
const ApiProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(apiReducer, initialState);

  return (
    <ApiContext.Provider value={{ state, dispatch }}>
      {children}
    </ApiContext.Provider>
  );
};

export { ApiContext, ApiProvider };
