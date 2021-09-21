import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { getUserProfile } from "../redux/Profile_reducer";
import { compose } from "redux";
import { getStatus, updateStatus, savePhoto, saveProfile } from "../redux/Profile_reducer";
import { AppStateType } from "../redux/Redux-store";
import {RouteComponentProps} from 'react-router-dom'
import { ProfileType } from "./../../types/types";


type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    getUserProfile:(userId: number)=> void
     getStatus:(userId: number)=> void
     updateStatus:(status: string)=> void
      savePhoto:(file: File)=> void
      saveProfile:(profile: ProfileType)=> Promise<any>
}

type PathParamsType = {
    userId: string
}

type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<PathParamsType>

class ProfileContainer extends React.Component<PropsType> {
    refreshProfile() {
        let userId: number | null = +this.props.match.params.userId;
        if (!userId) {
            userId = this.props.autorizedUserId;
            if (!userId) {
                this.props.history.push('/login')
            }
        }

        if(!userId){
            console.log('mahai') 
               }
               else{
                this.props.getUserProfile(userId );
                this.props.getStatus(userId )
            }
               }
       
    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate() {
        if (this.props.match.params.userId != this.props.match.params.userId) {
            this.refreshProfile()
        }

    }
    render() {

        return <div>
            <Profile {...this.props}
                isOwner={!this.props.match.params.userId}
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatus}
                savePhoto={this.props.savePhoto} />
        </div>
    }
}

let mapStateToProps = (state:AppStateType) => {
    return ({
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        autorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth
    })
}


export default compose<React.ComponentType>(
    connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile }),
    withRouter
)(ProfileContainer)

