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
const apiEndPoint = process.env.NEXT_PUBLIC_DEVAPI_URL;
const cookie = new Cookie();

const Tweet = () => {
    const router = useRouter();
    const {tid} = router.query;

    const [tweetDetail,setTweetDetail] = useState({});
    const [isAuth,setIsAuth] = useState(true);
    const [resTweetDetail,setResTweetDetail] = useState(true);
    const [likesArray,setLikesArray] = useState([]);
    
    
    useEffect(() => {
      const fetchData = async () => {
        console.log(tid);
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
        console.log(data);
        if (res.status === 401){
            setIsAuth(false);
            setResTweetDetail(false);
        }else if(res.status === 200 || res.status === 201){
            setTweetDetail(data);
            setLikesArray(data.like);
        }else{
            setResTweetDetail(false);
        }
      };
      fetchData();
    },[tid]);

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
              setMyprofile(data[0]);
          }else if(res.status === 400 || res.status === 401 || res.status === 402 || res.status === 403 || res.status === 404){
              setMyprofile([]);
          }
  
      }
      getUserId();
  },[cookie.get("access_token")]);
    
    // console.log(tweetDetail);
    // console.log(likesArray);
    
    const confirmDelete = async(e) => {
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

                      <button className="block sm:text-lg md:text-xl text-white bg-yellow-500 py-2 px-2 focus:outline-none hover:bg-yellow-600 rounded md:w-1/6 text-center md:mx-3 md:my-1">
                        Edit
                      </button>
                      </div>
                    ):(
                      <></>
                    )}
                    <CommentPost tid={tid}/>
                    <CommentList tid={tid}/>
                </MainLayout>
            </div>
        </Layout>
    </>
  )
}

export default Tweet;
