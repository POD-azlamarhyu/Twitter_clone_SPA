import React from 'react'
import HomeMenu from './HomeMenu';
import Aside from './Aside';

const MainLayout:React.FC = ({children}:{children:any}) => {
  return (
    <>
        <HomeMenu />
            <main className='md:w-6/12 md:h-full'>
                {children}
            </main>
        <Aside />
    </>
  )
}

export default MainLayout;