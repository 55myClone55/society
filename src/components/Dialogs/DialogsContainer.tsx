import React from 'react';
import { actions } from '../redux/Dialogs_reducer ';
import Dialogs from './Dialogs';
import { connect } from "react-redux"
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux';
import { AppStateType } from '../redux/Redux-store';

let mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage

    }
}


export default compose(
    connect(mapStateToProps, {
        ...actions
    }),
    //withAuthRedirect
)(Dialogs)