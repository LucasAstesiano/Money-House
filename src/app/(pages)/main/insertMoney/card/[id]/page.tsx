import InsertCardConfirm from "@/app/Components/insertMoney/InsertCardConfim";
import MainLayout from "@/app/Components/MainLayout";
import React from "react";

export default async function Page ( {params}:{params:Promise<{id:string}>}) {
  const id=(await params).id;


  return (
    <MainLayout>
       <InsertCardConfirm id={id}/>
    </MainLayout>
  );
};

