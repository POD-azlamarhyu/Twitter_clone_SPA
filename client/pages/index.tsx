import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Auth from './auth';
import Layout from '../components/Layout';


const Home: NextPage = () => {

  return (
    <>
        <Auth />
    </>
  )
}

export default Home;
