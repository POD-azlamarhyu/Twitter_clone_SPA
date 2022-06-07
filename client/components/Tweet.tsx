import React from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { tweetsType } from '../pages/api/types';

const apiEndPoint = process.env.NEXT_PUBLIC_DEVAPI_URL;


const Tweet = ({tweet}:{tweet:tweetsType}) => {
    const router:any = useRouter();
    const tid:number = tweet.id;

  return (
    <>
        <Link href={`/tweet/${tid}`}>
            <div className='md:p-4 border-t border-b border-gray-400 cursor-pointer hover:bg-gray-300'>
                    <div className='my-3'>
                        <p className='text-left mx-3 break-words'>
                            {tweet.text}
                        </p>
                    </div>
                    {tweet.tweet_img ? (
                        <div className='md:w-5/6 md:h-5/6'>
                            <img src={`${tweet.tweet_img}`} className='p-2'/>
                        </div>
                    ):(
                        <></>
                    )}
                    <div>
                        <p className='md:text-sx text-gray-500'>
                            {tweet.created_on}
                        </p>
                    </div>
            </div>
        </Link>
    </>
  );
}

export default Tweet;