import type {NextPage} from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import {useState} from "react";
import Cookie from "universal-cookie";
import axios from 'axios';
import Layout from "../components/Layout";

const apiEndPoint = process.env.NEXT_PUBLIC_DEVAPI_URL;

const cookie = new Cookie();


const Register = () => {
    const router = useRouter();

    const [formData,setFormData] = useState({
        email:'',
        password:'',
    });
    const {email,password} = formData; 
    const onChange = (e) => {
        setFormData({...formData,[e.target.name]: e.target.value});
    }
    const postRegister = async () => {
        try{
            console.info("アカウント登録を行います\n");
            await fetch(
                `${apiEndPoint}auth/signup/`,
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
            .then((res) => {
                console.info(res);
                if (res.status === 201 && res.ok){
                    return res.json();
                }else{
                    console.error(res);
                    throw "ユーザ登録に失敗しました";
                }
            })
            .then((data)=>{
                console.info(data);
                router.push("/auth");
            })
            
        }catch(error){
            alert(error);
        }
    };

    const authUser = async (e) => {
        e.preventDefault();
        postRegister();
    };

    const goToLogin = () => {
        router.push("/auth");
    }

    return(
        <>
        <Layout title="Register">
        <div className="flex flex-col justify-center items-center h-screen w-full">
            <div className="flex md:mx-5 md:my-6">
                <h1 className="justify-center align-middle items-center md:text-4xl font-mono">
                    アカウント登録
                </h1>
            </div>
            <div className="w-full">
                <form className="w-1/2 mx-auto" onSubmit={authUser}>
                    <div className="my-4">
                        <div className="my-2 text-base md:text-xl">
                            <p className="text-2xl font-bold">メールアドレス</p>
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
                        <div className="my-2 text-base md:text-xl">
                            <p className="font-bold text-2xl">
                                パスワード
                            </p>
                        </div>
                        <input 
                            className="w-full bg-gray-200 bg-opacity-50 rounded border border-gray-300 focus:border-yellow-500 focus:bg-transparent focus:ring-2 focus:ring-yellow-300 text-base outline-none text-gray-700 py-2 px-7 leading-8 transition-colors duration-200 ease-in-out"
                            type="password"
                            name="password"
                            placeholder="半角英数記号8文字以上"
                            onChange={onChange}
                            value={password}
                            required
                        />
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="align-middle block sm:text-xl md:text-2xl test-white bg-yellow-500 py-2 px-2 focus:outline-none hover:bg-yellow-600 rounded text-white m-4">
                            <span className="p-4">
                                登録
                            </span>
                        </button>
                    </div>
                </form>
                <div className="flex justify-center items-center">
                    <span className="cursor-pointer font-medium text-gray-500 hover:text-indigo-500 hover:font-bold" onClick={goToLogin}>
                        ログインする
                    </span>
                </div>
            </div>
        </div>
        </Layout>
        </>
    )
};


export default Register;