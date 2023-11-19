import { Button } from 'flowbite-react';
import ButtonGroup from 'flowbite-react/lib/esm/components/Button/ButtonGroup';
import React from 'react'

type Props = {
  pageSize: number;
  onPageSizeChange: (pageSize: number) => void;
}

const pageSizeButtons = [4, 8, 12];

export default function Filters({ pageSize, onPageSizeChange }: Props) {
  return (
    <div className='flex justify-between items-center mb-4'>
      <div>
        <span className='uppercase text-sm text-gray-500 mr-2'>Page Size</span>
        <ButtonGroup>
          {pageSizeButtons.map((value, index) => (
            <Button
              key={index}
              color={`${pageSize === value ? 'red' : 'gray'}`}
              onClick={() => onPageSizeChange(value)}>
              {value}
            </Button>
          ))}
        </ButtonGroup>
      </div>
    </div>
  )
}
