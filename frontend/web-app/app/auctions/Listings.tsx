'use client'
import React, { useEffect, useState } from 'react'
import { shallow } from 'zustand/shallow';
import qs from 'query-string';
import { Auction, PagedResult } from '@/types';

import AuctionCard from './AuctionCard';
import AppPagination from '../components/AppPagination';
import Filters from './Filters';
import { getData } from '../actions/auctionActions';
import { useParamsStore } from '@/hooks/useParamsStore';
import EmptyFilter from '../components/EmptyFilter';

export default function Listings() {
  const [data, setData] = useState<PagedResult<Auction[]>>();
  const params = useParamsStore(store => ({
    pageNumber: store.pageNumber,
    pageSize: store.pageSize,
    searchTerm: store.searchTerm,
    orderBy: store.orderBy,
    filterBy: store.filterBy
  }), shallow)
  const setParams = useParamsStore(state => state.setParams);
  const url = qs.stringifyUrl({ url: '', query: params });

  useEffect(() => {
    getData(url).then(response => {
      setData(response);
    })
  }, [url])

  if (!data) return <h3>Loading...</h3>

  return (
    <>
      <Filters />
      {data.results.length === 0 ? <EmptyFilter showReset /> : (
        <>
          <div className='grid grid-cols-4 gap-6'>
            {data.results.map((auction) => (
              <AuctionCard auction={auction} key={auction.id} />
            ))}
          </div>
          <div className='flex justify-center mt-5'>
            <AppPagination
              currentPage={params.pageNumber}
              pageCount={data.pageCount}
              onPageChange={(page) => setParams({ pageNumber: page })} />
          </div>
        </>
      )}
    </>
  )
}
