import React from 'react'
import { useRouter } from "next/router";
import { useState,useEffect,useContext,useRef } from "react";
import Cookie from "universal-cookie";
import { faImage } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { editProfileType,apiEndpointType } from '../pages/api/types';

const apiEndPoint:apiEndpointType = process.env.NEXT_PUBLIC_DEVAPI_URL;
const cookie:any = new Cookie();

const CreateProfile = ({isCreateOpenModal,setIsCreateOpenModal}:{isCreateOpenModal:boolean,setIsCreateOpenModal:React.Dispatch<React.SetStateAction<boolean>>}) => {

    const [createProfile,setCreateProfile] = useState<editProfileType>({
        nickname:"",
        account:'',
        bio: '',
        icon:'',
        link: "",
    });
    const [icon,setIcon] = useState<string|File>("");

    const inputImageDom = useRef(null);

    const onChangeImg = (e:React.ChangeEvent<HTMLInputElement>) => {
        let uploadFile;
        e.currentTarget.files !== null ? (
            uploadFile = e.currentTarget.files[0]
        ):(
            uploadFile=""
        )
        setIcon(uploadFile);
    }
    const onChange = (e:React.ChangeEvent<HTMLInputElement>):void => {
        setCreateProfile({...createProfile,[e.target.name]: e.target.value});
    }

    const onSubmitProfile = async(e:React.FormEvent<HTMLFormElement>):Promise<void> =>{
        // e.preventDefault();
        const form_data = new FormData();
        form_data.append("nickname",createProfile.nickname);
        form_data.append("account",createProfile.account);
        form_data.append("bio",createProfile.bio);
        form_data.append("icon",icon);
        form_data.append("link",createProfile.link);

        const res = await fetch(`${apiEndPoint}auth/user/profile/`,{
            method:"POST",
            headers:{
                "Authorization": `JWT ${cookie.get("access_token")}`,
            },
            body:form_data,
        })
        const data = await res.json();
        if (res.status === 200 ){
            closeModal();
        }
    }

    const closeModal = ():void =>{
        setIsCreateOpenModal(!isCreateOpenModal);
    }

    const openImageHandler = ():void => {
        inputImageDom.current.click();
    }

    return (
    <>
        {isCreateOpenModal ? (
            <div id='overlay' className='md:fixed top-0 left-0 w-full h-full bg-gray-600 flex flex-col items-center justify-center  z-10 bg-opacity-90'>
                <div className='bg-white border-2 md:w-3/5'>
                    <div className='flex justify-start md:m-3'> 
                        <button className='sm:text-lg md:text-xl text-white bg-blue-500 md:py-2 md:px-2 focus:outline-none hover:bg-blue-600 rounded text-center cursor-pointer ' onClick={closeModal}>
                            閉じる
                        </button>
                    </div>
                    <form className='md:m-2 md:p-5 flex flex-col' onSubmit={onSubmitProfile}>
                        <div className="my-2 md:text-2xl font-bold text-2xl">
                            nickname:
                        </div>
                        <input type="text" className="w-full bg-gray-200 bg-opacity-50 rounded border border-gray-300 focus:border-yellow-500 focus:bg-transparent focus:ring-2 focus:ring-yellow-300 text-base outline-none text-gray-700 py-2 px-7 leading-8 transition-colors duration-200 ease-in-out"
                        placeholder='nickname...'
                        name='nickname'
                        value={createProfile.nickname}
                        onChange={onChange}
                        />
                        <div className="my-2 md:text-2xl font-bold text-2xl">
                            account:
                        </div>
                        <input type="text" className="w-full bg-gray-200 bg-opacity-50 rounded border border-gray-300 focus:border-yellow-500 focus:bg-transparent focus:ring-2 focus:ring-yellow-300 text-base outline-none text-gray-700 py-2 px-7 leading-8 transition-colors duration-200 ease-in-out"
                        placeholder='account...'
                        name='account'
                        value={createProfile.account}
                        onChange={onChange}
                        />
                        <div className="my-2 md:text-2xl font-bold text-2xl">
                            bio:
                        </div>
                        <textarea type="text" className="w-full bg-gray-200 bg-opacity-50 rounded border border-gray-300 focus:border-yellow-500 focus:bg-transparent focus:ring-2 focus:ring-yellow-300 text-base outline-none text-gray-700 py-2 px-7 leading-8 transition-colors duration-200 ease-in-out"
                        placeholder='bio...'
                        name='bio'
                        value={createProfile.bio}
                        onChange={onChange}
                        >
                        </textarea>
                        <div className="my-2 md:text-2xl font-bold text-2xl">
                            link:
                        </div>
                        <input type="url" className="w-full bg-gray-200 bg-opacity-50 rounded border border-gray-300 focus:border-yellow-500 focus:bg-transparent focus:ring-2 focus:ring-yellow-300 text-base outline-none text-gray-700 py-2 px-7 leading-8 transition-colors duration-200 ease-in-out"
                        placeholder='url'
                        name='link'
                        value={createProfile.link}
                        onChange={onChange}
                        />
                        <div className="my-2 md:text-2xl font-bold text-2xl">
                            icon
                        </div>
                        <input 
                            ref={inputImageDom}
                            type="file" 
                            accept="image/*"
                            name='icon'
                            hidden={true}
                            onChange={onChangeImg}
                        />
                        <span className='md:text-3xl md:block cursor-pointer' onClick={openImageHandler}>
                            <FontAwesomeIcon icon={faImage} />
                        </span>
                        <button
                            type='submit'
                            className='align-middle block sm:text-xl md:text-2xl test-white bg-yellow-600 py-4 focus:outline-none hover:bg-yellow-700 rounded text-white md:w-1/2 md:m-auto'
                            >
                            Save
                        </button>
                    </form>
                </div>
            </div>
        ):(
            <></>
        )}
    </>
    )
}

export default CreateProfile;