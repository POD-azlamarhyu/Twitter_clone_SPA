export type apiEndpointType = string | undefined;

export interface authFormData{
    email:string;
    password:string;
}

export interface loginResType{
    refresh:string;
    access:string;    
}

export interface registerResType{
    success:string;
}

export interface routerQsTidType{
    tid:number;
}

export interface tweetsType{
    id:number;
    text:string;
    user_tweet:number;
    created_on: string;
    tweet_img: string;
    update_on: string;
    like:number[];
}

export interface profileType{
    id:number;
    nickname:string;
    user_profile:number;
    account:string;
    bio:string;
    icon:string;
    link:string;
    created_on:string;
    update_on: string;
}

export interface editProfileType{
    nickname:string;
    account:string;
    bio:string;
    icon:string;
    link:string;
}


export interface commentType{
    id:number;
    text:string;
    user_comment:number;
    tweet:number;
    comment_img:string;
    created_on:string;
}

export interface commentPostType{
    text:string;
    comment_img:string;
}