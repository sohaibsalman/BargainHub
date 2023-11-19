import React from 'react';
import { Button } from 'flowbite-react';
import { AiOutlineClockCircle, AiOutlineSortAscending } from 'react-icons/ai';
import { BsFillStopCircleFill, BsStopwatchFill } from 'react-icons/bs';
import { GiFinishLine, GiFlame } from 'react-icons/gi';
import { useParamsStore } from '@/hooks/useParamsStore';


const pageSizeButtons = [4, 8, 12];

const orderByButtons = [
  {
    label: 'Alphabetically',
    icon: AiOutlineSortAscending,
    value: 'make'
  },
  {
    label: 'End date',
    icon: AiOutlineClockCircle,
    value: 'endingSoon'
  },
  {
    label: 'Recently added',
    icon: BsFillStopCircleFill,
    value: 'new'
  },
]

const filterButtons = [
  {
    label: 'Live Auctions',
    icon: GiFlame,
    value: 'live'
  },
  {
    label: 'Ending in 6 hours',
    icon: GiFinishLine,
    value: 'endingSoon'
  },
  {
    label: 'Completed',
    icon: BsStopwatchFill,
    value: 'finished'
  },
]

export default function Filters() {
  const pageSize = useParamsStore(store => store.pageSize);
  const setParams = useParamsStore(store => store.setParams);
  const orderBy = useParamsStore(store => store.orderBy);
  const filterBy = useParamsStore(store => store.filterBy);

  return (
    <div className='flex justify-between items-center mb-4'>
      <div>
        <span className='uppercase text-sm text-gray-500 mr-2 font-semibold'>Filter by</span>
        <Button.Group>
          {filterButtons.map(({label, icon: Icon, value}) => (
            <Button
              key={value}
              onClick={() => setParams({filterBy: value})}
              color={`${filterBy === value ? 'red' : 'gray'}`}
              className='focus:ring-0'
            >
                <Icon className='mr-3 h-4 w-4' />
                {label}
              </Button>
          ))}
        </Button.Group>
      </div>
      <div>
        <span className='uppercase text-sm text-gray-500 mr-2 font-semibold'>Order by</span>
        <Button.Group>
          {orderByButtons.map(({label, icon: Icon, value}) => (
            <Button
              key={value}
              onClick={() => setParams({orderBy: value})}
              color={`${orderBy === value ? 'red' : 'gray'}`}
              className='focus:ring-0'
            >
                <Icon className='mr-3 h-4 w-4' />
                {label}
              </Button>
          ))}
        </Button.Group>
      </div>
      <div>
        <span className='uppercase text-sm text-gray-500 mr-2 font-semibold'>Page Size</span>
        <Button.Group>
          {pageSizeButtons.map((value, index) => (
            <Button
              key={index}
              color={`${pageSize === value ? 'red' : 'gray'}`}
              onClick={() => setParams({ pageSize: value })}
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
