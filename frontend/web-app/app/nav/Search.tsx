'use client'
import React, { useState } from 'react'
import { useParamsStore } from '@/hooks/useParamsStore'
import { FaSearch } from 'react-icons/fa'

export default function Search() {
  const setParams = useParamsStore(state => state.setParams);
  const searchValue = useParamsStore(state => state.searchValue);
  const setSearchValue = useParamsStore(state => state.setSearchValue);
  const reset = useParamsStore(state => state.reset);

  function search() {
    setParams({searchTerm: searchValue});
  }

  function handleSearchTermChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.value) reset();
    setSearchValue(e.target.value);
  }

  return (
    <div className='flex w-[50%] items-center border-2 rounded-full py-2 shadow-sm'>
      <input type="text" 
        placeholder='Search for cars by make, model or color'
        value={searchValue}
        className='
          flex-grow
          pl-5
          bg-transparent
          focus:outline-none
          border-transparent
          focus:border-transparent
          focus:ring-0
          text-sm
          text-gray-600
        '
        onChange={handleSearchTermChange}
        onKeyPress={e => {
          if (e.key === "Enter") search()
        }}
      />
      <button onClick={search}>
        <FaSearch size={34} className='bg-red-400 text-white rounded-full p-2 cursor-pointer mx-2' />
      </button>
    </div>
  )
}
