import { ProfileType, UserType } from './../types/types';
import React from 'react';
import axios from 'axios';

export type ResponseType<D = {}, RC =ResultCodeEnum > = {
    deta: D
    messages:Array<string>
    resultCode:RC
}

export const instanse = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "b1775b2f-c3a5-4509-8dc9-90b5629de7c3"
    }
})
export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
    
}

export enum RresultCodeForCaptchaEnum {

    CaptchaIsRequired = 10
}

export type GetItemsType = {
    item: Array<UserType>
    totalCount: number
    error: string | null
}




