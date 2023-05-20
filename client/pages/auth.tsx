import type {NextPage} from "next";
import React, { ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {useState,useContext} from "react";
import Cookie from "universal-cookie";
import axios from 'axios';
import Layout from "../components/Layout";
import isLoginContext from './_app';
import { ChangeEventHandler } from "react";
import { apiEndpointType,authFormData,loginResType } from "./api/types";
import { useCookies } from "react-cookie";


const apiEndPoint:apiEndpointType = process.env.NEXT_PUBLIC_DEVAPI_URL;

const cookie:any = new Cookie();


const Auth:React.FC = () => {
    const router:any = useRouter();
    const [formData,setFormData] = useState<authFormData>({
        email:'',
        password:'',
    });
    const {email,password} = formData; 
    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData,[e.target.name]: e.target.value});
    }

    const postLogin = async ():Promise<any> => {
        try{
            await fetch(
                `${apiEndPoint}auth/account/jwt/create/`,
                {
                    method:"POST",
                    body:JSON.stringify({
                        email:email,
                        password:password
                    }),
                    headers:{
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((res:any) => {
                console.log(res);
                if (res.status === 400 || res.status === 401 || res.status === 402){
                    console.error(res);
                    throw "ログインできませんでした";
                }else if(res.ok){
                    return res.json();
                }else{
                    console.info(res);
                    return;
                }

            })
            .then((data:loginResType) => {
                console.log(data);
                const options = {path: "/"};
                cookie.set("access_token",data.access,options);
                cookie.set("is_auth","true",options);
                
                // getUserId();
                router.push("/main");
            });
            
        }catch(error){
            alert(error);
        }
    };

    const authUser = async (e:React.FormEvent<HTMLFormElement>):Promise<void> => {
        e.preventDefault();
        postLogin();
    };

    const goToRegister = ():void => {
        router.push("/register")
    }

    return(
        <>
        <Layout title="auth Login">
        <div className="flex flex-col justify-center items-center h-screen w-full">
            <div className="flex md:mx-5 md:my-6">
                <h1 className="justify-center align-middle items-center md:text-4xl font-mono">
                    ログイン
                </h1>
            </div>
            <div className="w-full">
                <form className="w-1/2 mx-auto" onSubmit={authUser}>
                    <div className="my-4">
                        <div className="my-2 md:text-2xl font-bold text-2xl">
                            メールアドレス
                        </div>
                        <input 
                            className="w-full bg-gray-200 bg-opacity-50 rounded border border-gray-300 focus:border-yellow-500 focus:bg-transparent focus:ring-2 focus:ring-yellow-300 text-base outline-none text-gray-700 py-2 px-7 leading-8 transition-colors duration-200 ease-in-out"
                            type="email"
                            name="email"
                            placeholder="xxxx@yyyy.com"
                            onChange={onChange}
                            value={email}
                            required
                        />
                    </div>
                    <div className="my-4">
                        <div className="my-2 font-bold text-2xl md:text-2xl">
                            パスワード
                        </div>
                        <input 
                            className="w-full bg-gray-200 bg-opacity-50 rounded border border-gray-300 focus:border-yellow-500 focus:bg-transparent focus:ring-2 focus:ring-yellow-300 text-base outline-none text-gray-700 py-2 px-7 leading-8 transition-colors duration-200 ease-in-out"
                            type="password"
                            name="password"
                            placeholder="password"
                            onChange={onChange}
                            value={password}
                            required
                        />
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="align-middle block sm:text-xl md:text-2xl test-white bg-yellow-500 py-2 px-2 focus:outline-none hover:bg-yellow-600 rounded text-white m-4">
                            <span className="p-4">
                                ログイン
                            </span>
                        </button>
                    </div>

                </form>
                <div className="flex justify-center items-center">
                    <span className="cursor-pointer font-medium text-gray-500 hover:text-indigo-500" onClick={goToRegister}>
                        アカウントを登録
                    </span>
                </div>
            </div>
        </div>
        </Layout>
        </>
    )
};


export default Auth;