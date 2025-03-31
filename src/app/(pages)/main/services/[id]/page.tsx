import MainLayout from "@/app/Components/MainLayout";
import ServicesDetail from "@/app/Components/services/ServicesDetail";


export default async function Page ( {params}:{params:Promise<{id:string}>}) {
  const id = (await params).id
  
  return (
    <MainLayout>
      <ServicesDetail id={id}/>
    </MainLayout>
  );
};

