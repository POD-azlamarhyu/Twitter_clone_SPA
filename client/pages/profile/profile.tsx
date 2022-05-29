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
const NoImage = require("../../public/no_image_logo.png").default;
const apiEndPoint = process.env.NEXT_PUBLIC_DEVAPI_URL;

const cookie = new Cookie();


const Profile = () => {

    // const {isLogin,setLogin,profile,setUserInfo} = useContext(isLoginContext);
    const [myprofile,setMyprofile] = useState({
        account:'',
        bio: '',
        icon:'',
        id: 0,
        link: "",
        nickname:"",
        update_at: '',
        user_profile:0,
    });
    const [isLogin,setIsLogin] = useState(false);
    const [isOpenModal,setIsOpenModal] = useState(false);
    const [isIcon,setIsIcon] = useState("");

    const [isCreateOpenModal,setIsCreateOpenModal] = useState(false);

    useEffect(()=> {
        const getUserId = async() =>{
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
            console.log(data);
            if (res.status === 200 || res.status === 201){
                setIsLogin(!isLogin);
                setMyprofile(data[0]);
            }else if(res.status === 400 || res.status === 401 || res.status === 402 || res.status === 403 || res.status === 404){
                setIsLogin(false);
            }
    
        }
        getUserId();
    },[cookie.get("access_token")]);

    const openEditProfileModal = () =>{
        setIsOpenModal(!isOpenModal);
    }

    const openCreateProfileModal = () =>{
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