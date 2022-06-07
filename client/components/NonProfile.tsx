import React from 'react';
import { useState } from 'react';

const NonProfile:React.FC = () =>{


    const [isCreateOpenModal,setIsCreateOpenModal] = useState<boolean>(false);

    const openCreateProfileModal = ():void =>{
        setIsCreateOpenModal(!isCreateOpenModal);
    }
    return(
        <>
            <div className='md:my-3 md:mx-5 md:px-7'>
                <div className='flex justify-center items-center align-middle md:my-4 md:py-3'>
                    <p>
                        プロフィールがありません。作成してください。
                    </p>
                </div>
            </div>
            <div className="flex md:mx-2 md:my-4 md:p-2 justify-end">
                <button className="block sm:text-lg md:text-xl text-white bg-blue-600 md:py-3 md:px-5 focus:outline-none hover:bg-blue-800 rounded text-center md:mx-3" onClick={openCreateProfileModal}>
                    Create Profile
                </button>
            </div>
        </>
    );
}

export default NonProfile;