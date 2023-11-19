'use client'
import React from 'react'
import { Pagination } from 'flowbite-react'

type Props = {
  currentPage: number;
  pageCount: number;
  onPageChange: (e: number) => void;
}

export default function AppPagination({ currentPage, pageCount, onPageChange }: Props) {
  return (
    <Pagination 
      currentPage={currentPage}
      onPageChange={e => onPageChange(e)}
      totalPages={pageCount}
      layout='pagination'
      showIcons
      className='mb-5'
    />
  )
}
