'use client'
import Header from '@/app/Components/Header';
import React from 'react';
import { useRouter } from 'next/navigation';
import AuthServices from '@/app/api/auth/AuthServices';


const SignupPage: React.FC = () => {

  
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    firstname: '',
    lastname: '',
    dni: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCreate = async(e: React.FormEvent) => {
    e.preventDefault();
    try{
      await AuthServices.signUp({ ...formData, dni: Number(formData.dni) })
      router.push('/signup/success');
    }catch (error){
      console.error(error);
  };
}

  return (
    <div className="bg-[#3A393E] min-h-screen">
      <Header color={'#C1FD35'} showLoginButton={true} loginColor={'#3A393E'} singupColor={'white'} imgUrl={'/logo 02.png'} />
      <div className="flex justify-center mt-20 min-h-screen">
        <div className="p-8 rounded-lg shadow-lg w-full max-w-3xl text-white">
          <h2 className="text-2xl font-bold mb-6 text-center">Crear Cuenta</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleCreate}>
            <div>
              <input type="text" name="firstname" placeholder="Nombre" value={formData.firstname} onChange={handleChange} className="mt-1 bg-white text-black block w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <input type="text" name="lastname" placeholder="Apellido" value={formData.lastname} onChange={handleChange} className="mt-1 bg-white text-black block w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <input type="text" name="dni" placeholder="DNI" value={(formData.dni)} onChange={handleChange} className="mt-1 bg-white text-black block w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <input type="email" name="email" placeholder="Correo Electrónico" value={formData.email} onChange={handleChange} className="mt-1 bg-white text-black block w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <p className='text-sm mt-3.5 text-gray-300 col-span-2'>Usa entre 6 y 20 carácteres (debe contener al menos al menos 1 carácter especial, una mayúscula y un número)</p>
            <div>
              <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} className="mt-1 bg-white text-black block w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <input type="password" name="confirmPassword" placeholder="Confirmar contraseña" value={formData.confirmPassword} onChange={handleChange} className="mt-1 bg-white text-black block w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <input type="tel" name="phone" placeholder="Telefono" value={formData.phone} onChange={handleChange} className="mt-1 bg-white text-black block w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <button type="submit" className="cursor-pointer mt-1 block text-black bg-[#C1FD35] w-full p-2 border border-[#C1FD35] rounded-md">
                Crear Cuenta
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;