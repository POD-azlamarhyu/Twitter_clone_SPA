import Link from "next/link";
import { useRouter} from "next/router";
import React from 'react'
import Layout from "../../components/Layout";
import MainLayout from "../../components/MainLayout";
import { useEffect,useState  } from "react";
import Cookie from "universal-cookie";
import NotFount from "../../components/NotFount";
import CommentList from "../../components/CommentList";
const apiEndPoint = process.env.NEXT_PUBLIC_DEVAPI_URL;
const cookie = new Cookie();




const Comment = () => {
    const router = useRouter();
    const {cid,tid} = router.query;

    const [commentDetail,setCommentDetail] = useState({});
    const [isAuth,setIsAuth] = useState(true);
    const [resCommentDetail,setResCommentDetail] = useState(true);
    
    
    
    useEffect(() => {
      const fetchData = async () => {
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
    
    // console.log(tweetDetail);
    // console.log(likesArray);
    
    const confirmDelete = async(e) => {
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
            router.push(`/tweet/[${tweet_id}]`);
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
                        href={`/tweet/[${tid}]`}
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
                    <div className="flex md:m-2 md:p-2 justify-end">

                          <button className="block sm:text-lg md:text-xl text-white bg-red-500 md:py-2 md:px-2 focus:outline-none hover:bg-red-600 rounded md:w-1/6 text-center md:mx-3 md:my-1" onClick={confirmDelete}>
                            Delete
                          </button>

                          <button className="block sm:text-lg md:text-xl text-white bg-yellow-500 py-2 px-2 focus:outline-none hover:bg-yellow-600 rounded md:w-1/6 text-center md:mx-3 md:my-1">
                            Edit
                          </button>
                    </div>
                    <CommentList tweet_id={tid}/>
                </MainLayout>
            </div>
        </Layout>
    </>
  );
}

export default Comment;