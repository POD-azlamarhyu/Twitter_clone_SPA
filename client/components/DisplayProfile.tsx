import React from 'react';
import CreateProfile from "./CreateProfile";
import EditProfile from './EditProfile';
import { useState,useEffect,useContext } from "react";
import NotFount from './NotFount';
import { profileType,editProfileType } from '../pages/api/types';

const NoImage = require("../public/no_image_logo.png").default;

const DisplayProfile = ({myprofile}:{myprofile:profileType}) => {

    const [isOpenModal,setIsOpenModal] = useState<boolean>(false);

    const openEditProfileModal = ():void =>{
        setIsOpenModal(!isOpenModal);
    }

  return (
    <>
        <div className='md:my-3 md:mx-5 md:px-7'>
        <div className='flex justify-center items-center align-middle md:my-4 md:py-3'>
            {myprofile.icon ? (
                <img src={myprofile.icon} className="md:w-24 md:h-24 rounded-full"/>
            ):(
                <img src={NoImage.src} className="md:w-24 md:h-24 rounded-full"/>
            )}
        </div>
        <div className='md:my-4'>
            <p className='md:text-3xl md:py-2'>
                nickname : {myprofile.nickname}
            </p>
            {
                myprofile.account ? (
                    <p className='md:text-xl text-gray-600'>
                        @:{myprofile.account}
                    </p>
                    ):(
                    <p className='md:text-xl text-gray-600'>
                        No account id
                    </p>
                    )
            }
        </div>
        <div className='md:my-2'>
            <p>
                {myprofile.bio}
            </p>
        </div>
        <div className='md:my-2'>
            <p>
                mylink:{myprofile.link}
            </p>
        </div>
    </div>
    <div className="flex md:mx-2 md:my-4 md:p-2 justify-end">
        <button className="block sm:text-lg md:text-xl text-white bg-blue-500 md:py-3 md:px-5 focus:outline-none hover:bg-blue-600 rounded text-center md:mx-3" onClick={openEditProfileModal}>
            Edit Profile
        </button>
    </div>
    <EditProfile 
        isOpenModal={isOpenModal} 
        setIsOpenModal={setIsOpenModal} 
        profile_id ={myprofile.id} 
        currentprofile={myprofile}
    /> 
    </>
  )
}

export default DisplayProfile;