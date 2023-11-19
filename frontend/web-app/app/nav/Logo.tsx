'use client'
import { useParamsStore } from '@/hooks/useParamsStore'
import React from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'

export default function Logo() {
  const reset = useParamsStore(state => state.reset);

  return (
    <div className='flex item gap-2 text-2xl font-semibold text-red-600 cursor-pointer' onClick={reset}>
      <AiOutlineShoppingCart size={34} />
      <div>BargainHub</div>
    </div>)
}
