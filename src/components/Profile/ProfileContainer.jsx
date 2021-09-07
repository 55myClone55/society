import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { Component, withAuthRedirect } from './../../hoc/withAuthRedirect'
import { getUserProfile } from "../redux/Profile_reducer";
import { compose } from "redux";
import { getStatus, updateStatus, savePhoto, saveProfile } from "../redux/Profile_reducer";


class ProfileContainer extends React.Component {
    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.autorizedUserId;
            if (!userId) {
                this.props.history.push('/login')
            }
        }
        this.props.getUserProfile(userId);
        this.props.getStatus(userId)
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

let mapStateToProps = (state) => {
    return ({
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        autorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth
    })
}


export default compose(
    connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile }),
    withRouter
)(ProfileContainer)

