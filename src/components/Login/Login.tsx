import React from 'react'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { required } from '../../utils/validator/validators'
import { Input,createField } from '../common/FormsControls/FormsControls'
import { connect } from 'react-redux'
import { login } from '../redux/auth_reducer'
import { Redirect } from 'react-router-dom'
//import { s } from './Login.module.css'
import captchaUrl from '../redux/auth_reducer'
import { AppStateType } from '../redux/Redux-store'
///import {createField} from '../common/FormsControls/FormsControls'


type LoginFormOwnProps = {
    captchaUrl:string | null
}

const LoginForm:React.FC<InjectedFormProps<LoginFormValuesType,LoginFormOwnProps> & LoginFormOwnProps> = (props, captchaUrl) => {
    return (
        <form onSubmit={props.handleSubmit}>
            { createField <LoginFormValuesTypeKeys>('Email','email',[required], Input) }
            { createField <LoginFormValuesTypeKeys>('Password','password',[required], Input,{}) }
            { createField <LoginFormValuesTypeKeys>(undefined,'rememberMe',[], Input, {type:'checkbox'}, 'remember me') }

            {captchaUrl && <img src={captchaUrl}/>}
            {captchaUrl && createField <LoginFormValuesTypeKeys>('Simbols', 'captcha', [required], Input, {}) }
     
            {null && <div className={'formed'}>
                {null}
            </div>
            }
            <div>
                <button>login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<LoginFormValuesType,LoginFormOwnProps>({ form: 'login' })(LoginForm)

type MapStatePropsType = {
    captchaUrl:string | null
    isAuth:boolean
}
type MapDispatchPropsType = {
        login:(email:string, password:string , rememberMe:boolean,captcha:string )=> void

}

export type LoginFormValuesType = {
    captcha:string 
    rememberMe:boolean
    password:string
    email:string
}

type LoginFormValuesTypeKeys = Extract <keyof LoginFormValuesType,string>

//@ts-ignore
const Login:React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
//@ts-ignore
    const onSubmit = (formData:LoginFormValuesType) => {
        props.login(formData.email, formData.password, formData.rememberMe,formData.captcha)
    }
    if (props.isAuth) {
        return <Redirect to='/profile' />
    }
    //@ts-ignore
    return <div>
                <h1>login</h1>
                
        < LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>
}
const mapStateToProps = (state:AppStateType):MapStatePropsType => ({
    captchaUrl:state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})
export default connect(mapStateToProps, { login })(Login);