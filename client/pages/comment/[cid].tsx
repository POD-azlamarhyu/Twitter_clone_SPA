import Link from "next/link";
import { useRouter} from "next/router";
import React from 'react'
import Layout from "../../components/Layout";
import MainLayout from "../../components/MainLayout";
import { useEffect,useState  } from "react";
import Cookie from "universal-cookie";
import NotFount from "../../components/NotFount";
import CommentList from "../../components/CommentList";
import { profileType,commentType,apiEndpointType } from "../api/types";

const apiEndPoint:apiEndpointType = process.env.NEXT_PUBLIC_DEVAPI_URL;
const cookie = new Cookie();

const Comment:React.FC = () => {
    const router = useRouter();
    const {cid,tid}:{cid:number,tid:number} = router.query;

    const [commentDetail,setCommentDetail] = useState<commentType>({
        id:0,
        text:"",
        user_comment:0,
        tweet:0,
        comment_img:"",
        created_on:"",
    });
    const [isAuth,setIsAuth] = useState<boolean>(true);
    const [resCommentDetail,setResCommentDetail] = useState<boolean>(true);
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
    
    useEffect(() => {
        const fetchData = async ():Promise<void> => {
            if (cookie.get("is_auth") !== "true"){
                router.push('/auth');
            }else{
                console.log("login!");
            }
            const res = await fetch(
                `${apiEndPoint}api/comment/${cid}/`,
            {
                method:"GET",
                headers:{
                    "Authorization": `JWT ${cookie.get("access_token")}`,
                },
            }
        );
        const data = await res.json();
        
        if (res.status === 401){
            setIsAuth(false);
            setResCommentDetail(false);
        }else if(res.status === 200 || res.status === 201){
            setCommentDetail(data);
        }else{
            setResCommentDetail(false);
        }
        };
        fetchData();
    },[cid]);
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
          const query_res = await fetch(`${apiEndPoint}api/comment/${cid}/`,
            {
              method:"DELETE",
              headers:{
                "Authorization": `JWT ${cookie.get("access_token")}`,
              },
            }
          )
          if (query_res.ok){
            router.push(`/tweet/[${tid}]`);
          }
        }
    }

  return (
    <>

<Layout title={`tweet detail`}>
            <div className="w-full h-full flex flex-row">
                <MainLayout>
                    <div className="flex md:m-2 md:p-2">
                      <Link
                        href={`/tweet/${tid}`}
                      >
                          <a className="block sm:text-lg md:text-xl text-white bg-yellow-500 py-2 px-2 focus:outline-none hover:bg-yellow-600 rounded md:w-1/6 text-center">
                            Back
                          </a>
                      </Link>
                    </div>
                    <div className="mt-3 px-2">
                    {resCommentDetail?(
                        <Link href={`/comment/${cid}`}>
                        <div className='md:p-4 border-t border-b border-gray-400 cursor-pointer hover:bg-gray-300'>
                                <div className='my-3'>
                                    <p className='text-left mx-3 break-words'>
                                        {commentDetail.text}
                                    </p>
                                </div>
                                {commentDetail.comment_img ? (
                                    <div className='md:w-5/6 md:h-5/6'>
                                        <img src={`${commentDetail.comment_img}`} className='p-2'/>
                                    </div>
                                ):(
                                    <></>
                                )}
                                <div>
                                    <p className='md:text-sx text-gray-500'>
                                        {commentDetail.created_on}
                                    </p>
                                </div>
                        </div>
                    </Link>
                      
                    ):(
                      <>
                        <NotFount />
                      </> 
                    )}
                    </div>
                    {myprofile.user_profile === commentDetail.user_comment ? (
                      <div className="flex md:m-2 md:p-2 justify-end">

                        <button className="block sm:text-lg md:text-xl text-white bg-red-500 md:py-2 md:px-2 focus:outline-none hover:bg-red-600 rounded md:w-1/6 text-center md:mx-3 md:my-1" onClick={confirmDelete}>
                          Delete
                        </button>
  
                        <button className="block sm:text-lg md:text-xl text-white bg-yellow-500 py-2 px-2 focus:outline-none hover:bg-yellow-600 rounded md:w-1/6 text-center md:mx-3 md:my-1">
                          Edit
                        </button>
                      </div>
                    ):(
                      <></>
                    )}
                </MainLayout>
            </div>
        </Layout>
    </>
  );
}

export default Comment;