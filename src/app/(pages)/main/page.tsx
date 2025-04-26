"use client";
import { AccountServices } from "@/app/api/account/AccountServices";
import Inicio from "@/app/Components/Inicio";
import MainLayout from "@/app/Components/MainLayout";
import { useDataContext } from "@/app/context/DataContext";
import { useEffect } from "react";
const MainPage: React.FC = () => {

  const {setAccountData} = useDataContext();

  useEffect(() => {
    AccountServices.getAccountData().then((response) => {
      setAccountData(response);
      
      
    })
  }
  , [setAccountData]);

  return (
    <MainLayout>
      <Inicio/>
    </MainLayout>
  );
};

export default MainPage;
