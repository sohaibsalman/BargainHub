'use client'
import React from 'react'
import Link from 'next/link';
import { useParamsStore } from '@/hooks/useParamsStore'
import { AiOutlineShoppingCart } from 'react-icons/ai'

export default function Logo() {
  const reset = useParamsStore(state => state.reset);

  return (
    <div className='flex item gap-2 text-2xl font-semibold text-red-600 cursor-pointer' onClick={reset}>
      <AiOutlineShoppingCart size={34} />
      <Link href="/">BargainHub</Link>
    </div>)
}
