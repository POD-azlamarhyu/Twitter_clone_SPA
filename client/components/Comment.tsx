import React from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { commentType } from '../pages/api/types';

const Comment = ({comment,tid,uid}:{comment:commentType,tid:number,uid:number}) => {
    const router = useRouter();
    const cid:number = comment.id;

  return (
    <>
        <Link 
            href={{pathname:`/comment/${cid}`,query:{cid,tid}}}
        >
            <div className='md:p-4 border-t border-b border-gray-400 cursor-pointer hover:bg-gray-300'>
                    <div className='my-3'>
                        <p className='text-left mx-3 break-words'>
                            {comment.text}
                        </p>
                    </div>
                    {comment.comment_img ? (
                        <div className='md:w-5/6 md:h-5/6'>
                            <img src={`${comment.comment_img}`} className='p-2'/>
                        </div>
                    ):(
                        <></>
                    )}
                    <div>
                        <p className='md:text-sx text-gray-500'>
                            {comment.created_on}
                        </p>
                    </div>
            </div>
        </Link>
    </>
  )
}

export default Comment;