import { useParamsStore } from '@/hooks/useParamsStore';
import { Button } from 'flowbite-react';
import React from 'react'

const pageSizeButtons = [4, 8, 12];

export default function Filters() {
  const pageSize = useParamsStore(store => store.pageSize);
  const setParams = useParamsStore(store => store.setParams);

  return (
    <div className='flex justify-between items-center mb-4'>
      <div>
        <span className='uppercase text-sm text-gray-500 mr-2 font-semibold'>Page Size</span>
        <Button.Group>
          {pageSizeButtons.map((value, index) => (
            <Button
              key={index}
              color={`${pageSize === value ? 'red' : 'gray'}`}
              onClick={() => setParams({pageSize: value})}
              className='focus:ring-0 font-semibold'
              >
              {value}
            </Button>
          ))}
        </Button.Group>
      </div>
    </div>
  )
}
