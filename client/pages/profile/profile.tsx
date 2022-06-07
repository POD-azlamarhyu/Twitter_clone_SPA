import React from 'react'
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { useState,useEffect,useContext } from "react";
import MainLayout from "../../components/MainLayout";
import TweetList from "../../components/TweetList"
import Tweet from "../../components/Tweet";
import NotFount from "../../components/NotFount";
import isLoginContext from '../_app';
import Cookie from "universal-cookie";
import Image from 'next/image';
import CreateProfile from "../../components/CreateProfile";
import DisplayProfile from '../../components/DisplayProfile';
import NonProfile from '../../components/NonProfile';

import { profileType,editProfileType,apiEndpointType } from '../api/types';

const apiEndPoint:apiEndpointType = process.env.NEXT_PUBLIC_DEVAPI_URL;

const cookie:any = new Cookie();


const Profile:React.FC = () => {

    const [myprofile,setMyprofile] = useState<profileType>({
        id: 0,
        nickname:"",
        user_profile:0,
        account:'',
        bio: '',
        icon:'',
        link: "",
        created_on:'',
        update_on: '',
    });
    const [isLogin,setIsLogin] = useState<boolean>(false);
    
    const [isCreateOpenModal,setIsCreateOpenModal] = useState<boolean>(false);

    useEffect(()=> {
        const getUserId = async():void =>{
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

            if (res.status === 200 || res.status === 201){
                setIsLogin(!isLogin);
                setMyprofile(data[0]);
            }else if(res.status === 400 || res.status === 401 || res.status === 402 || res.status === 403 || res.status === 404){
                setIsLogin(false);
            }
    
        }
        getUserId();
    },[cookie.get("access_token")]);

    const openCreateProfileModal = ():void =>{
        setIsCreateOpenModal(!isCreateOpenModal);
    }

  return (
      <>
        <Layout title="my profile">
            <div className="md:w-full md:h-screen md:flex md:flex-row">
                <MainLayout>
                    <>
                        {myprofile ? (
                            <DisplayProfile myprofile={myprofile}/>  
                        ):(
                            <>
                            <div className='md:my-3 md:mx-5 md:px-7'>
                                <div className='flex justify-center items-center align-middle md:my-4 md:py-3'>
                                    <p>
                                        プロフィールがありません。作成してください。
                                    </p>
                                </div>
                            </div>
                            <div className="flex md:mx-2 md:my-4 md:p-2 justify-end">
                                <button className="block sm:text-lg md:text-xl text-white bg-blue-600 md:py-3 md:px-5 focus:outline-none hover:bg-blue-800 rounded text-center md:mx-3" onClick={openCreateProfileModal}>
                                    Create Profile
                                </button>
                            </div>
                        </>
                        )}
                        <CreateProfile isCreateOpenModal={isCreateOpenModal} setIsCreateOpenModal={setIsCreateOpenModal}/>
                    </>
                </MainLayout>
            </div>
        </Layout>
      </>
  )
}

export default Profile;