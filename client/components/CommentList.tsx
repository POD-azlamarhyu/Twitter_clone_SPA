import React from 'react';
import { useEffect,useState  } from "react";
import { useRouter} from "next/router";
import Cookie from "universal-cookie";
import Comment from './Comment';
import axios from 'axios';
import { commentType,apiEndpointType } from '../pages/api/types';

const apiEndPoint = process.env.NEXT_PUBLIC_DEVAPI_URL;
const cookie = new Cookie();


const CommentList = ({tid,uid}:{tid:number,uid:number}) => {

    const router = useRouter();
    const [comments,setComments] = useState<commentType[]>([]);
    const [isComments,setIsComments] = useState<boolean>(true);

    useEffect(() => {
        const getComment = async():Promise<void> => {

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
                                        <Comment 
                                            key={comment.id} 
                                            comment={comment} 
                                            tid={tid}
                                            uid={uid}
                                        />
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