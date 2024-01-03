import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import React from 'react'

const GroupLoadingSkeleton = () => {
  return (
      <div className='w-full grid grid-cols-3 gap-4 '>
          <div className='border p-2 rounded-md'>
              <Skeleton height={20} count={1} />
              <Skeleton height={10} count={5} />
        </div>
          <div className='border p-2 rounded-md'>
              <Skeleton height={20} count={1} />
              <Skeleton height={10} count={5} />
          </div>
          <div className='border p-2 rounded-md'>
              <Skeleton height={20} count={1} />
              <Skeleton height={10} count={5} />
          </div>
      </div>
  )
}

export default GroupLoadingSkeleton