import ConfirmTransaction from "@/app/Components/insertMoney/ConfirmTransaction";
import MainLayout from "@/app/Components/MainLayout";


export default async function ConfirmPage ( {searchParams}:{searchParams:Promise<{money:string}>}) {
  const money=(await searchParams).money
    
  return(
    <MainLayout>
      <ConfirmTransaction money={money} />
    </MainLayout>
  );
};
