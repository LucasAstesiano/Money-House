
import MainLayout from "@/app/Components/MainLayout";
import ResponseServicesPay from "@/app/Components/services/ResponseServicesPay";

import React from "react";

export default async function responsePayment ( {params}:{params:Promise<{valor:number,name:string,fecha:string,card:number}>}) { 
const {valor,name,fecha,card} = await params


  return (
    <MainLayout>
      <ResponseServicesPay valor={valor} name={name} fecha={fecha} card={card} />
    </MainLayout>
  );
};

