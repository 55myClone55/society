import { applyMiddleware, combineReducers, createStore, compose, Action } from "redux";
import profileReducer from './Profile_reducer';
import dialogsReducer from './Dialogs_reducer ';
import sidebarReducer from './Sidebar_reducer';
import usersReduser from "./users_reducer";
import authReduser from "./auth_reducer";
import thunkMiddleware from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import appReduser from "./app_reducer ";
import { ThunkAction } from 'redux-thunk';

let rootReducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReduser,
    auth: authReduser,
    form: formReducer,
    app: appReduser
})

//type PropertiesTypes<T> = T extends {[key:string]:infer U} ? U: never
//export type InfernActionTypes<T extends {[key:string]: (...args: any[])=> any} > = ReturnType<PropertiesTypes<T>>
export type InfernActionTypes<T> = T extends {[key:string]: (...args: any[])=> infer U}? U: never

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R,AppStateType,unknown,A>

type RootReduceType = typeof rootReducers
export type AppStateType = ReturnType<RootReduceType>
//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

let store = createStore(rootReducers, applyMiddleware(thunkMiddleware));

//window.store = store;

export default store;