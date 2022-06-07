import React from "react";
import CopyrightIcon from '@mui/icons-material/Copyright';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';

export const copyright = "C.I. Inc. 9Chan 2022";



const Footer:React.FC = () => {

    return(
        <>
            <footer className="flex justify-center bg-gray-600 text-white">
                <div className="mx-6 my-2">
                    <CopyrightIcon fontSize="large"/>{copyright}
                </div>
            </footer>
        </>
    );
}

export default Footer;