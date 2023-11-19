import React from 'react';

import Search from './Search';
import Logo from './Logo';


export default function Navbar() {
  return (
    <header className='sticky z-50 flex justify-between bg-white py-2 px-5 items-center text-gray-800 shadow-md'>
      <Logo />
      <Search />
      <div>Login</div>
    </header>
  );
}
