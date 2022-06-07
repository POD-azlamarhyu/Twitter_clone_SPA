import type { NextPage } from "next";
import React from 'react'
import Link from "next/link";
import { useRouter } from "next/router";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faHouse,faUser} from "@fortawesome/free-solid-svg-icons";
import {faTwitter} from '@fortawesome/free-brands-svg-icons';

const HomeMenu:React.FC = () => {
  return (
    <>
        <div className="md:w-3/12 flex md:flex-col m-0 p-0 md:justify-start">
            <Link href={"/main"}>
              <div className="md:mx-2 md:my-2 md:px-2 md:w-11/12 md:text-4xl md:flex cursor-pointer hover:bg-gray-400 rounded">
                <span className="px-2 py-3 md:text-2xl">
                  <FontAwesomeIcon icon={faHouse} />
                </span>
                <p className="pr-2 py-3 md:text-2xl">
                  ホーム
                </p>
              </div>
            </Link>
            <Link href={"/profile/profile"}>
              <div className="md:mx-2 md:my-2 md:px-2 md:w-11/12 md:flex cursor-pointer hover:bg-gray-400 rounded">
                <span className="px-2 py-3 md:text-2xl">
                  <FontAwesomeIcon icon={faUser} />
                </span>
                <p className="pr-2 py-3 md:text-2xl">
                  プロフィール
                </p>
              </div>
            </Link>
            <Link href={"/tweet/tweetPost"}>
              <div className="md:mx-2 md:my-2 md:px-2 md:w-11/12 md:text-4xl md:flex cursor-pointer hover:bg-gray-400 rounded">
                <span className="px-2 py-3 md:text-2xl">
                  <FontAwesomeIcon icon={faTwitter} />
                </span>
                <p className="pr-2 py-3 md:text-2xl">
                  ツイート
                </p>
              </div>
            </Link>
        </div>
    </>
  )
}

export default HomeMenu;