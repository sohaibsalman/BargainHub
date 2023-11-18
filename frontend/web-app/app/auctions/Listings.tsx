import React from 'react'
import { Auction, PagedResult } from '@/types';

import AuctionCard from './AuctionCard';

const getData = async (): Promise<PagedResult<Auction[]>> => {
  const response = await fetch("http://localhost:6001/search");
  if (!response.ok) throw new Error("Error fetching auctions");

  return response.json();
}

export default async function Listings() {
  const data = await getData();

  return (
    <div className='grid grid-cols-4 gap-6'>
      {data && data.results.map((auction) => (
        <AuctionCard auction={auction} key={auction.id} />
      ))}
    </div>
  )
}
