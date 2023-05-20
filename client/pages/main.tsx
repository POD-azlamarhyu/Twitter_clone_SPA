import Cookie from "universal-cookie";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { useState,useEffect,useContext } from "react";
import MainLayout from "../components/MainLayout";
import Tweet from "../components/Tweet";
import NotFount from "../components/NotFount";
import { tweetsType,apiEndpointType } from "./api/types";
import React from "react";

const apiEndPoint:apiEndpointType = process.env.NEXT_PUBLIC_DEVAPI_URL;

const cookie:any = new Cookie();

const Main:React.FC = () => {

    const router = useRouter();
    const [tweets,setTweets] = useState<tweetsType[]>([]);
    const [resTweet,setResTweet] = useState<boolean>(true);
    const [isAuth,setIsAuth] = useState<boolean>(true);
    const [isLogin,setIsLogin] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async ():Promise<void> => {
            console.log(isLogin)
            if (cookie.get("is_auth") !== "true"){
                router.push('/auth');
            }else{
                console.log("login!");
                setIsLogin(true);
            }

            const res = await fetch(
                `${apiEndPoint}api/tweet/list/`,
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
                                tweets.map((tweet:tweetsType) => {
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