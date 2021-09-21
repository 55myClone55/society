///import { actions } from './users_reducer';
import { InfernActionTypes,BaseThunkType } from './Redux-store';
//import { actions } from './app_reducer ';
import { usersAPI } from "../../API/users-api";
import { profileAPI } from "../../API/profile-api";
import { FormAction, stopSubmit } from "redux-form";
import { ProfileType,PostType,PhotosType,ContactsType } from "../../types/types";




let initialState = {
    posts: [
        { id: 1, message: 'hi,mahai!', likesCount: 10 },
        { id: 2, message: 'hi, sam mahai', likesCount: 19 }
    ] as  Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    newPostText:''
}


const profileReducer = (state = initialState, action:ActionType):InitialStateType => {
    switch (action.type) {
        case 'SN/PROFILE/ADD-POST': {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost]
                
            };
        }
        
        case 'SN/PROFILE/SET_USER_PROFILE': {
            return {
                ...state,
                //@ts-ignore
                profile: action.profile
            };
        }
        case 'SN/PROFILE/SET_STATUS': {
            return {
                ...state,
                //@ts-ignore
                status: action.status
            };
        }
        case 'SN/PROFILE/SAVE_PHOTO_SUCCESS': {
            //@ts-ignore
            return {...state,profile: { ...state.profile, photos: action.photos }as ProfileType};
        }

        default:
            return state;
    }

}
 export const actions = {
    addPostActionCreator:(newPostText:string) => ({ type: 'SN/PROFILE/ADD-POST', newPostText } as const),
    setStatus: (status:string) => ({ type: 'SN/PROFILE/SET_USER_PROFILE', status } as const),
    savePhotoSuccess:(photos:PhotosType) => ({ type: 'SN/PROFILE/SET_STATUS', photos } as const),
    setUserProfile:(profile:ProfileType) => ({ type: 'SN/PROFILE/SAVE_PHOTO_SUCCESS', profile } as const)
 }


export const getUserProfile = (userId:number):ThunkType => async (dispatch) => {
 const data = await profileAPI.getStatus(userId) 
 //@ts-ignore
        dispatch(setUserProfile(data));

    
}
export const getStatus = (userId:number):ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(data));

}
export const updateStatus = (status:string):ThunkType => async (dispatch) => {
    try{

    
    let data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(actions.setStatus(status));
    }
}catch(eroor){
    //
}
}
export const savePhoto = (file:File):ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(file)
    if (data.resultCode === 0) {
        //@ts-ignore
        dispatch(actions.savePhotoSuccess(data.data.photos));
    }
}
export const saveProfile = (profile:ProfileType):ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId
    const data = await profileAPI.saveProfile(profile)
    if (data.resultCode === 0) {
        if(userId != null){
        dispatch(getUserProfile(userId));
        }else{
            throw new Error('error')
        }
    } else {
        //@ts-ignore
        dispatch(actions.stopSubmit('edit-profile', { _error: data.message[0] }))
        //@ts-ignore
        return Promise.reject(data.message[0])
    }
}

export default profileReducer;

export type InitialStateType = typeof initialState
type ActionType = InfernActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionType | FormAction>