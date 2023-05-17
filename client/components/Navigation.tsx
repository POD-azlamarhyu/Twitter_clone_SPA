import Link from "next/link";
import {useRouter} from "next/router";
import Cookie from "universal-cookie";
import { useState,useEffect,useContext } from "react";
import React from "react";
import { apiEndpointType,authFormData,loginResType } from "./api/types";
const cookie = new Cookie();
const apiEndPoint:apiEndpointType = process.env.NEXT_PUBLIC_DEVAPI_URL;
const Navigation: React.FC= () => {

    const [isLogin,setIsLogin] = useState<boolean>(false);

    useEffect(() => {
        if(cookie.get("access_token")){
            setIsLogin(true);
        }
    },[isLogin]);

    const router = useRouter();
    const postLogout = async ():void => {
        const options = {path: "/"}
        try{
            await fetch(
                `${apiEndPoint}auth/account/jwt/verify/`,
                {
                    method:"POST",
                    body:JSON.stringify({
                        token: `${cookie.get("access_token")}`
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
                    throw "エラーが発生しました";
                }else if(res.ok){
                    return res.json();
                }else{
                    console.info(res);
                    return;
                }

            })
            cookie.remove("access_token",options);
            router.push("/auth");
        }catch(error){
            alert(error);
        }

        
        
    };

    const goToHome = ():void =>{
        router.push("/main");
    };

    return (
        <>
            <div className="py-2 bg-gray-600">
                <div>
                    <h1 className="text-5xl mx-3 md:m-3 cursor-pointer text-white" onClick={goToHome}>
                        9Chan
                    </h1>
                </div>
                <ul className="flex flex-col items-center justify-center sm:flex-row md:justify-end sm:mt-2 sm:h-12">
                    <>
                        {!isLogin ? (
                            <li className="text-white px-3 py-2 text-center">
                                <Link
                                    href={"/auth"}
                                    
                                >
                                    <a className="align-middle block sm:text-lg md:text-xl test-white bg-yellow-500 py-2 px-2 focus:outline-none hover:bg-yellow-600 rounded">ログイン</a>
                                </Link>
                            </li>
                        ):(
                            <></>
                        )}
                        {!isLogin ?(
                            <li className="text-white px-3 py-2 text-center">
                            <Link 
                                href={"/register"}
                                // as="/account/signup"
                            >
                                <a className="align-middle block sm:text-lg md:text-xl test-white bg-yellow-500 py-2 px-2 focus:outline-none hover:bg-yellow-600 rounded">アカウント登録</a>
                            </Link>
                        </li>
                        ):(
                            <></>
                        )}
                        {isLogin ? (
                            <li className="text-white px-3 py-2 text-center">
                            <button className="align-middle block sm:text-lg md:text-xl test-white bg-yellow-500 py-2 px-2 focus:outline-none hover:bg-yellow-600 rounded"
                            onClick={postLogout}>
                                ログアウト
                            </button>
                        </li>
                        ):(
                            <></>
                        )}
                    </>
                </ul>
            </div>
        </>
    );
}

export default Navigation;