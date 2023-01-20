import Head from "next/head";
import next from "next";
import Navigation from "./Navigation";
import React from 'react'
import Footer from "./Footer";

const Layout:React.FC = ({children,title}:{children:any,title:string}) => {
  return (
    <>
        <Head>
          <title>{title}</title>
        </Head>
        <Navigation />
        <div className="flex flex-1 justify-center items-center w-screen flex-col md:my-2">
            {children}
        </div>
        {/* <Footer /> */}
    </>
  )
}

export default Layout;