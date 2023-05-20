import React from 'react';
import { useRouter } from 'next/router';
import { useState,useEffect,useRef } from 'react';
import Cookie from "universal-cookie";
import Layout from "../../components/Layout";
import MainLayout from "../../components/MainLayout";
import NotFount from "../../components/NotFount";
import axios from 'axios';
import { apiEndpointType,profileType } from '../api/types';

const apiEndPoint:apiEndpointType = process.env.NEXT_PUBLIC_DEVAPI_URL;
const cookie:any = new Cookie();

const tweetPost:React.FC = () => {

    const router:any = useRouter();
    const [userProfile,setUserProfile] = useState<profileType[]>([]);
    const [isAuth,setIsAuth] = useState<boolean>(true);
    const [tweetImg,setTweetImg] = useState<string|File>("");
    const [text,setText] = useState<string>("");
    const inputImageDom = useRef();
    const like:number[] = [];
    const [isLogin,setIsLogin] = useState<boolean>(false);

    useEffect(() => {
        const getUserId = async ():Promise<void> => {
            if (cookie.get("is_auth") !== "true"){
                router.push('/auth');
            }else{
                console.log("login!");
                setIsLogin(true);
            }
            const res = await fetch(
                `${apiEndPoint}auth/user/myprofiles/`,
                {
                    method: "GET",
                    headers:{
                        "Authorization": `JWT ${cookie.get("access_token")}`,
                    },
                }
            );
            const data = await res.json();
            // console.log(data);
            // console.log(res.status);

            if (res.status === 401){
                setIsAuth(false);
            }else if(res.status === 200){
                setUserProfile(data);
                // console.log(userProfile);
            }else{
                setIsAuth(false);
            }
        }
        getUserId();
    },[cookie.get("access_token")]);

    const onChangeImg = (e:React.ChangeEvent<HTMLInputElement>) => {
        let uploadFile;
        e.currentTarget.files !== null ? (
            uploadFile = e.currentTarget.files[0]
        ):(
            uploadFile=""
        )
        setTweetImg(uploadFile);
    }
    const onChangeText = (e:React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    }

    const postTweet = async(e:Event):Promise<void> => {
        e.preventDefault();
        let img;
        const form_data = new FormData();
        form_data.append('text',text);
        if(tweetImg){
            form_data.append("tweet_img",tweetImg);
            img = tweetImg;
        }else{
            img=null;
        }
        const res = await fetch(
            `${apiEndPoint}api/tweet/`,
            {
                method: "POST",
                headers:{
                    "Authorization": `JWT ${cookie.get("access_token")}`,
                },
                body:form_data,
            }
        )
        if (res.status === 201 ){
            console.log("ツイートしました");
        }
    }



  return (
      <>
        <Layout title={`tweet post`}>
            <div className='w-full h-screen flex flex-row'>
                <MainLayout>
                    <div className='m-2'>
                        <form className='border-3' onSubmit={postTweet}>
                            <div>
                                <textarea 
                                type="text"
                                className='md:my-5 md:mx-0 shadow appearance-none border rounded md:w-full md:h-24 md:py-2 md:px-3'  placeholder='tweet...'
                                wrap='hard'
                                name='text'
                                onChange={onChangeText}
                                >

                                </textarea>
                            </div>
                            <div>
                                <input 
                                    ref={inputImageDom}
                                    type="file" 
                                    accept="image/*"
                                    name='tweet_img'
                                    onChange={onChangeImg}
                                    />
                            </div>
                            <div className='flex justify-end'>
                                <button
                                    type='submit'
                                    className='align-middle block sm:text-xl md:text-2xl test-white bg-yellow-500 py-2 px-2 focus:outline-none hover:bg-yellow-600 rounded text-white m-4'
                                    >
                                    ツイート
                                </button>
                            </div>
                        </form>
                    </div>
                </MainLayout>
            </div>
        </Layout>
      </>
  )
}

export default tweetPost;