import React from 'react';
import { AiOutlineShoppingCart } from "react-icons/ai";


export default function Navbar() {
  return (
    <header className='sticky z-50 flex justify-between bg-white py-2 px-5 items-center text-gray-800 shadow-md'>
      <div className='flex item gap-2 text-2xl font-semibold text-red-600'>
        <AiOutlineShoppingCart size={34} />
        <div>BargainHub</div>
      </div>
      <div>Search</div>
      <div>Login</div>
    </header>
  );
}
