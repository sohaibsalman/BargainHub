import React from 'react'
import { Auction } from '@/types';

import CountdownTimer from './CountdownTimer';
import CardImage from './CardImage';

interface Props {
  auction: Auction;
}

export default function AuctionCard({ auction }: Props) {
  return (
    <a href='#' className='shadow-md rounded-lg group'>
      <div className='w-full bg-gray-200 aspect-w-16 aspect-h-10 overflow-hidden rounded-t-lg'>
        <div>
          <CardImage imageUrl={auction.imageUrl} />
          <div className='absolute bottom-2 left-2'>
            <CountdownTimer auctionEnd={auction.auctionEnd} />
          </div>
        </div>
      </div>
      <div className='flex justify-between items-center p-2 px-3'>
        <h3 className='text-gray-700'>{auction.make} {auction.model}</h3>
        <p className='font-semibold text-sm'>{auction.year}</p>
      </div>
    </a>
  )
}
