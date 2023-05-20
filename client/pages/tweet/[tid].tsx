import Link from "next/link";
import { useRouter} from "next/router";
import React from 'react'
import Layout from "../../components/Layout";
import MainLayout from "../../components/MainLayout";
import { useEffect,useState  } from "react";
import Cookie from "universal-cookie";
import NotFount from "../../components/NotFount";
import CommentList from "../../components/CommentList";
import CommentPost from "../../components/CommentPost";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { apiEndpointType,tweetsType,profileType } from "../api/types";


const apiEndPoint:apiEndpointType = process.env.NEXT_PUBLIC_DEVAPI_URL;
const cookie:any = new Cookie();

const Tweet:React.FC = () => {
    const router = useRouter();
    const {tid}:{tid:number} = router.query;

    const [tweetDetail,setTweetDetail] = useState<tweetsType>({
        id:0,
        text:"",
        user_tweet:0,
        created_on:"",
        tweet_img:"",
        update_on:"",
        tweet_like:[],
    });
    const [isAuth,setIsAuth] = useState<boolean>(true);
    const [resTweetDetail,setResTweetDetail] = useState<boolean>(true);
    const [likesArray,setLikesArray] = useState<number[]>([]);
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
    
    useEffect(() => {
      const fetchData = async ():Promise<void> => {
        const res = await fetch(
          `${apiEndPoint}api/tweet/${tid}/`,
          {
            method:"GET",
            headers:{
              "Authorization": `JWT ${cookie.get("access_token")}`,
            },
          }
        );
        const data = await res.json();
        console.log("data,",data);
        if (res.status === 401){
            setIsAuth(false);
            setResTweetDetail(false);
        }else if(res.status === 200 || res.status === 201){
            setTweetDetail(data);
            console.log(data.tweet_like);
            setLikesArray(data.tweet_like);
        }else{
            setResTweetDetail(false);
        }
      };
      fetchData();
    },[tid]);

    

    useEffect(()=> {
      const getUserId = async():Promise<void> =>{
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
              setMyprofile(data[0]);
          }else if(res.status === 400 || res.status === 401 || res.status === 402 || res.status === 403 || res.status === 404){
              setMyprofile(myprofile);
          }
  
      }
      getUserId();
  },[cookie.get("access_token")]);
    
    // console.log(tweetDetail);
    // console.log(likesArray);
    
    const confirmDelete = async(e:React.MouseEvent<HTMLInputElement>):Promise<void> => {
        const res = window.confirm("このツイートを削除します.よろしいですか？");
        if(res){
          const query_res = await fetch(`${apiEndPoint}api/tweet/${tid}/`,
            {
              method:"DELETE",
              headers:{
                "Authorization": `JWT ${cookie.get("access_token")}`,
              },
            }
          )
          if (query_res.ok){
            router.push("/main");
          }
        }
    }

    const checkIsLike = ():boolean =>{
        let isExist:boolean=false;
        if(likesArray !== null){
            isExist = likesArray.some((elem:number)=>{
            return elem === myprofile.user_profile;
        });
        }else{
            isExist=false;
        }
        return isExist;
    }

    const onPatchLike = async(e:React.MouseEvent<HTMLInputElement>):Promise<void> =>{
        e.preventDefault();
        const formData:any ={};
        const patchLikeAry:number[] = likesArray;
        const isPostedLike:boolean = checkIsLike();
        const uid:number = myprofile.user_profile;
        const patchAry:number[] = []; 

        let isExtract:number = patchLikeAry.length;
        console.log("parch like ary",patchLikeAry);
        if (isPostedLike){
            patchLikeAry.forEach((elem:number)=>{
                if(elem !== uid){
                    // formData.append("tweet_like",elem);
                    patchAry.push(elem);
                }
            })
        }else{
            patchLikeAry.push(uid);
            patchLikeAry.forEach((elem:number)=>{
                // formData.append("tweet_like",elem);
                patchAry.push(elem);
            });
        }
        console.log("patchAry",patchAry);
        formData["tweet_like"]= patchAry;
        console.log(formData);
        let res:any;
        if(!isPostedLike){
            console.log("新たにLikeを追加");
            res = await fetch(
                `${apiEndPoint}api/tweet/${tid}/`,
                {
                    method: "PATCH",
                    headers:{
                        "Content-Type": "application/json",
                        "Authorization": `JWT ${cookie.get("access_token")}`,
                    },
                    body: JSON.stringify(formData),
                }
            );
        }else{
            if(isExtract === 1){
                console.log("Like初期化");
                formData["text"]=tweetDetail.text;
                console.log(formData);
                res = await fetch(
                    `${apiEndPoint}api/tweet/${tid}/`,
                    {
                    method: "PATCH",
                    headers:{
                        "Content-Type": "application/json",
                        "Authorization": `JWT ${cookie.get("access_token")}`,
                    },
                    body: JSON.stringify(formData),
                    }
                );
            }else{
                console.log("unlikeします");
                res = await fetch(`${apiEndPoint}api/tweet/${tid}/`,{
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `JWT ${cookie.get("access_token")}`,
                    },
                    body: JSON.stringify(formData),
                    }
                );
            }
        }
        const data:tweetsType|any = await res.json();
        if(res.status===200){
            console.log("変更しました");
            console.log(data);
        }else{
            console.log(res);
            console.log("失敗しました");
        }
    };
    
    return (
    <>
        <Layout title={`tweet detail`}>
            <div className="w-full h-full flex flex-row">
                <MainLayout>
                    <div className="flex md:m-2 md:p-2">
                      <Link
                        href={"/main"}
                      >
                          <a className="block sm:text-lg md:text-xl text-white bg-yellow-500 py-2 px-2 focus:outline-none hover:bg-yellow-600 rounded md:w-1/6 text-center">
                            Back
                          </a>
                      </Link>
                    </div>
                    <div className="mt-3 px-2">
                    {resTweetDetail && tweetDetail ? (
                      <>
                        <div className='md:p-4 border-t border-b border-gray-400 cursor-pointer'>
                          <div className='my-3'>
                              <p className='text-left mx-3 break-words'>
                                  {tweetDetail.text}
                              </p>
                          </div>
                          {tweetDetail.tweet_img ? (
                              <div className='md:w-5/6 md:h-5/6'>
                                  <img src={`${tweetDetail.tweet_img}`} className='p-2'/>
                              </div>
                          ):(
                              <></>
                          )}
                          <div>
                              <p className='md:text-sx text-gray-500'>
                                  {tweetDetail.created_on}
                              </p>
                          </div>
                          <div className="flex flex-row md:border-t-2 md:mx-2 my-3 justify-start">
                            <div className="flex flex-row">
                              <span className="md:text-bold md:text-lg md:pl-2 md:pr-1" onClick={onPatchLike}>
                              <FontAwesomeIcon icon={faHeart} />
                              </span>
                              <p className="md:text-bold md:text-lg md:pl-2 md:pr-1">
                                {likesArray.length}
                              </p>
                              <p className="md:text-bold md:text-lg">
                                likes
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    ):(
                      <>
                        <NotFount />
                      </> 
                    )}
                    </div>
                    {myprofile.user_profile === tweetDetail.user_tweet ? (
                      <div className="flex md:m-2 md:p-2 justify-end">

                      <button className="block sm:text-lg md:text-xl text-white bg-red-500 md:py-2 md:px-2 focus:outline-none hover:bg-red-600 rounded md:w-1/6 text-center md:mx-3 md:my-1" onClick={confirmDelete}>
                        Delete
                      </button>

                      <button className="block sm:text-lg md:text-xl text-white bg-blue-500 py-2 px-2 focus:outline-none hover:bg-blue-600 rounded md:w-1/6 text-center md:mx-3 md:my-1">
                        Edit
                      </button>
                      </div>
                    ):(
                      <></>
                    )}
                    <CommentPost tid={tid} uid={myprofile.user_profile}/>
                    <CommentList tid={tid} uid={myprofile.user_profile}/>
                </MainLayout>
            </div>
        </Layout>
    </>
  )
}

export default Tweet;
