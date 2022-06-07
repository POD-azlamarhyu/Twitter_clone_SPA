import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Profile from './profile/profile';
import Auth from './auth';
import {createContext,useState} from 'react';


function MyApp({ Component, pageProps }: AppProps) {
  const isLoginContext = createContext();

  const [isLogin,setIsLogin] = useState(false);
  const setLogin = () => {
    setIsLogin(!isLogin);
  }
  const [profile,setProfile] = useState([]);
  const setUserInfo = (data) =>{
    setProfile(data);
  }
  

  return (
    <isLoginContext.Provider value={{isLogin,setLogin,profile,setUserInfo}}>
      <Component {...pageProps} />
    </isLoginContext.Provider>
  );
}

export default MyApp;
