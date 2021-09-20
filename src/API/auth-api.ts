import { instanse, ResultCodeEnum,RresultCodeForCaptchaEnum,ResponseType } from "./api";



type MeResponseDataType = {
    data:{
        id:number
        email:string
        login:string
    }
}

type LoginMeResponseDataType = {
            userId:number
           }
 

export const authAPI = {
    me() {
        return instanse.get<ResponseType<MeResponseDataType>>(`auth/me`).then(res => res.data)

    },
    login(email:string, password:string, rememberMe = false,captcha:null | string = null ) {
        return instanse.post<ResponseType<LoginMeResponseDataType, ResultCodeEnum | RresultCodeForCaptchaEnum>>(`auth/login`, { email, password, rememberMe,captcha })
        .then(res => res.data)
    },
    logout() {
        return instanse.delete(`auth/login`)

 
    }
}

