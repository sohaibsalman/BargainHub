'use client'
import React, { useEffect, useState } from 'react'
import { Auction } from '@/types';

import AuctionCard from './AuctionCard';
import AppPagination from '../components/AppPagination';
import { getData } from '../actions/auctionActions';
import Filters from './Filters';


export default function Listings() {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [pageSize, setPageSize] = useState(4);

  useEffect(() => {
    getData(pageNumber, pageSize).then(response => {
      setAuctions(response.results);
      setPageCount(response.pageCount);
    })
  }, [pageNumber, pageSize])

  if (auctions.length === 0) return <h3>Loading...</h3>

  return (
    <>
      <Filters pageSize={pageSize} onPageSizeChange={setPageSize} />
      <div className='grid grid-cols-4 gap-6'>
        {auctions.map((auction) => (
          <AuctionCard auction={auction} key={auction.id} />
        ))}
      </div>
      <div className='flex justify-center mt-5'>
        <AppPagination
          currentPage={pageNumber}
          pageCount={pageCount}
          onPageChange={setPageNumber} />
      </div>
    </>
  )
}
