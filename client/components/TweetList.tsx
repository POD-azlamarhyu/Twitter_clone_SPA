import React from 'react'
import { useState,useEffect } from "react";
import Cookie from "universal-cookie";
import Link from 'next/link';
import Tweet from './Tweet';
import NotFount from './NotFount';
import { useRouter } from 'next/router';

const apiEndPoint = process.env.NEXT_PUBLIC_DEVAPI_URL;

const cookie = new Cookie();
const TweetList = () => {

    const router = useRouter();
    const [tweets,setTweets] = useState([]);
    const [resTweet,setResTweet] = useState(true);
    const [isAuth,setIsAuth] = useState(true);

    

    return (
        <>

        </>
    )
}

export default TweetList;