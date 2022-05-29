import React from 'react';
import { useEffect,useState  } from "react";
import { useRouter} from "next/router";
import Cookie from "universal-cookie";
import Comment from './Comment';
import axios from 'axios';

const apiEndPoint = process.env.NEXT_PUBLIC_DEVAPI_URL;
const cookie = new Cookie();


const CommentList = ({tid}) => {

    const router = useRouter();
    const [comments,setComments] = useState([]);
    const [isComments,setIsComments] = useState(true);

    useEffect(() => {
        const getComment = async() => {
            const form_data = new FormData();
            form_data.append("tweet",tid);
            const res = await axios.get(
                `${apiEndPoint}api/commentlist/`,
                {
                    headers:{
                      "Authorization": `JWT ${cookie.get("access_token")}`,
                    },
                    params:{
                        tid:tid,
                    }
                }
            );

            if (res.status === 200 || res.status === 201){
                setComments(res.data);
            }
        }
        getComment();
    },[]);

  return (
      <>
        <div className='my-3'>
            {
                isComments ? (
                    <>
                        {
                            comments && comments.map((comment) => {
                                return (
                                    <>
                                        <Comment comment={comment} key={`${comment.id}comment`} tid={tid}/>
                                    </>
                                )
                                })
                        }
                    </>
                ):(
                    <></>
                )
            }
        </div>
      </>
  )
}

export default CommentList;