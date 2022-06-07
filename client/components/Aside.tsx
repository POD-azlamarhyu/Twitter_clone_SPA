import React from 'react';
import type { NextPage } from "next";
import CopyrightIcon from '@mui/icons-material/Copyright';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
export const copyright:string = "C.I. Inc. 9Chan 2022";
const Aside:React.FC = () => {
  return (
    <>
        <aside className='md:w-3/12 flex md:flex-col md:align-middle'>
            <div className="flex md:justify-center hover:bg-gray-400 rounded m-0 p-0 md:w-full">
                  <div className="mx-6 my-2">
                      <CopyrightIcon fontSize="large"/>{copyright}
                  </div>
            </div>
        </aside>
    </>
  )
}

export default Aside;