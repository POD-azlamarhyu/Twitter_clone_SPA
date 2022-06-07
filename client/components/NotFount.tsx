import React from 'react'

const NotFount:React.FC = () => {
  return (
    <>
        <div className='flex flex-col justify-center fixed w-screen'>
            <p className='md:text-3xl md:py3'>
                404 NotFound
            </p>
            <p className='md:text-3xl md:py-3'>
                お探しのページは存在しません
            </p>
        </div>
    </>
  )
}

export default NotFount;