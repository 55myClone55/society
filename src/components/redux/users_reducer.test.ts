import {UserType } from './../../types/types'
import usersReduser,{actions, InitialStateType} from './users_reducer'

let state: InitialStateType;
 beforeEach(() => {
    state = {
        users: [
            {
            id:0, name:"nnn", followed:false,
            photos:{small:null,large:null}, status:'status 1'
        },
        {
            id:1, name:"nnnn", followed:true,
            photos:{small:null,large:null}, status:'status 2'
        },
        {
            id:2, name:"nnnnn", followed:false,
            photos:{small:null,large:null}, status:'status 3'
        },
    ],
        pageSize: 5,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: [] 
    }
 })
     


test("follow success", ()=> {

const newState = usersReduser(state,actions.followSuccess(1))

expect(newState.users[0].followed).toBeFalsy()
expect(newState.users[1].followed).toBeTruthy()

})
test("unfollow success", ()=> {

    const newState = usersReduser(state,actions.unfollowSuccess(2))
    
    expect(newState.users[1].followed).toBeTruthy()
    expect(newState.users[0].followed).toBeFalsy()
    
    })