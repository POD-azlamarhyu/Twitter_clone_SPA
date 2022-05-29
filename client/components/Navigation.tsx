import Link from "next/link";
import {useRouter} from "next/router";
import Cookie from "universal-cookie";
import { useState,useEffect,useContext } from "react";

const cookie = new Cookie();

const Navigation = () => {

    const [isLogin,setIsLogin] = useState(false);

    useEffect(() => {
        if(cookie.get("access_token")){
            setIsLogin(true);
        }
    },[isLogin]);

    const router = useRouter();
    const postLogout = () => {
        const options = {path: "/"}
        cookie.remove("access_token",options);
        router.push("/auth")
    }

    const goToHome = () =>{
        router.push("/main");
    }

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