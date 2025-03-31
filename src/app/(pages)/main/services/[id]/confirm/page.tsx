
import MainLayout from "@/app/Components/MainLayout";
import ServicesConfirmPay from "@/app/Components/services/ServicesConfirmPay";

import React from "react";

export default async function confirmPage ( {params}:{params:Promise<{id:string}>}) { 
const serviceId = (await params).id
const parseId = parseInt(serviceId)
  return (
    <MainLayout>
      <ServicesConfirmPay serviceId={parseId}/>
    </MainLayout>
  );
};

