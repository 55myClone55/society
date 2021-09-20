import { PhotosType, ProfileType } from './../types/types';
import { instanse, ResponseType } from "./api";

type SavePhotoResponseDataType = {
    photos:PhotosType
}
export const profileAPI = {
    getProfile(userId:number) {
        return instanse.get<ProfileType>(`profile/` + userId).then(res => res.data)
    },
    getStatus(userId:number) {
        return instanse.get<string>(`profile/status/` + userId).then(res => res.data)
    },
    updateStatus(status:string) {
        return instanse.put<ResponseType>(`profile/status`, { status: status }).then(res => res.data)
    },

    savePhoto(photoFile:any) {
        const formData = new FormData()
        formData.append('image', photoFile)
        return instanse.put<ResponseType<SavePhotoResponseDataType>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data)
    },
    saveProfile(profile:ProfileType) {
        return instanse.put<ResponseType>(`profile`, profile).then(res => res.data)
    }
}