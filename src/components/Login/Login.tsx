import React from 'react'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { required } from '../../utils/validator/validators'
import { Input,createField } from '../common/FormsControls/FormsControls'
import { connect, useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/auth_reducer'
import { Redirect } from 'react-router-dom'
import captchaUrl from '../redux/auth_reducer'
import { AppStateType } from '../redux/Redux-store'
import {GetStryngKeys} from './../common/FormsControls/FormsControls'



type LoginFormOwnProps = {
    captchaUrl:string | null
}

const LoginForm:React.FC<InjectedFormProps<LoginFormValuesType,LoginFormOwnProps> & LoginFormOwnProps> = (props, captchaUrl) => {
    return (
      
        <form onSubmit={props.handleSubmit}>
            //@ts-ignore
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



export type LoginFormValuesType = {
    captcha:string 
    rememberMe:boolean
    password:string
    email:string
}

type LoginFormValuesTypeKeys = GetStryngKeys< LoginFormValuesType>


export const Login:React.FC = () => {

    const captchaUrl = useSelector((state:AppStateType)=>state.auth.captchaUrl)
    const isAuth = useSelector((state:AppStateType)=>state.auth.isAuth)
    const dispatch = useDispatch()

    const onSubmit = (formData:LoginFormValuesType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe,formData.captcha))
    }
    if (isAuth) {
        return <Redirect to='/profile' />
    }

    return <div>
                <h1>login</h1>
                
        < LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
    </div>
}

