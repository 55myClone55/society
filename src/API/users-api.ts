
import { instanse,GetItemsType,ResponseType } from "./api";



export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10,term: string = '',friend: null | boolean = null) {
        return instanse.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend===null ? '' : `&friend=${friend}`))
            .then(res => res.data)
    },
    follow(userId:number) {
        return instanse.post<ResponseType>(`follow/${userId}`).then(res => res.data)
    },
    unfollow(userId:number) {
        return instanse.delete(`follow/${userId}`).then(res => res.data) as Promise<ResponseType>
    }
}