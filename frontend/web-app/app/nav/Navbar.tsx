import React from 'react';

import Search from './Search';
import Logo from './Logo';
import LoginButton from './LoginButton';
import { getCurrentUser } from '../actions/authActions';
import UserActions from './UserActions';


export default async function Navbar() {
  const user = await getCurrentUser()
  return (
    <header className="sticky z-50 flex justify-between bg-white py-2 px-5 items-center text-gray-800 shadow-md">
      <Logo />
      <Search />
      {user ? <UserActions /> : <LoginButton />}
    </header>
  );
}
