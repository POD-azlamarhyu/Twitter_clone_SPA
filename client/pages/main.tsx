import Cookie from "universal-cookie";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { BrowserRouter,Switch,Route } from "react-router-dom";
import { useState,useEffect,useContext } from "react";
import MainLayout from "../components/MainLayout";
import TweetList from "../components/TweetList"
import Tweet from "../components/Tweet";
import NotFount from "../components/NotFount";

const apiEndPoint = process.env.NEXT_PUBLIC_DEVAPI_URL;

const cookie = new Cookie();

const Main = () => {

    const router = useRouter();
    const [tweets,setTweets] = useState([]);
    const [resTweet,setResTweet] = useState(true);
    const [isAuth,setIsAuth] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(
                `${apiEndPoint}api/tweetlist/`,
                {
                    method: "GET",
                    headers:{
                        "Authorization": `JWT ${cookie.get("access_token")}`
                    }
                }
            );
            const data = await res.json();
            if (res.status === 401){
                setIsAuth(false);
                setResTweet(false);
            }else if(res.status === 200 || res.status === 201){
               setTweets(data);
            }else{
                setResTweet(false);
            }
        };
        fetchData();
        console.log(tweets);
    },[]);

    return (
        <>
            <Layout title="Main page" >
                <div className="w-full h-full flex flex-row">
                    <MainLayout>
                    <div className='my-3'>
                        {
                            tweets && resTweet &&
                                tweets.reverse().map((tweet) => {
                                    return(
                                        <Tweet key={tweet.id} tweet={tweet} />
                                    )
                                })
                        }
                        {
                        resTweet ? (
                            <></>
                        ):(
                            <NotFount />
                        )
                        }
                    </div>
                    </MainLayout>
                </div>
            </Layout>
        </>
    );
}

export default Main;