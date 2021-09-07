import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { required } from '../../utils/validator/validators'
import { Input } from '../common/FormsControls/FormsControls'
import { connect } from 'react-redux'
import { login } from '../redux/auth_reducer'
import { Redirect } from 'react-router-dom'
import { s } from './Login.module.css'
import captchaUrl from '../redux/auth_reducer'

const LoginForm = (props,captchaUrl) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'Email'} name={'email'}
                    validate={[required]}
                    component={Input} />
            </div>
            <div>
                <Field placeholder={'Password'} name={'password'} type={'password'}
                    validate={[required]}
                    component={Input} />
            </div>
            <div>
                <Field component={Input} name={'rememberMe'} type={'checkbox'} />remember me
            </div>
            {captchaUrl && <img src={captchaUrl}/>}
            {captchaUrl && <div>
                <Field placeholder={'Simbols'} component={Input} name={'captcha'} type={'checkbox'} />simbols for img
            </div> }
            {props.error && <div>
                {props.error}
            </div>
            }
            <div>
                <button>login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

const Login = (props) => {

    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe,formData.captcha)
    }
    if (props.isAuth) {
        return <Redirect to='/profile' />
    }
    return <div>
        <h1>login</h1>
        < LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>
}
const mapStateToProps = (state) => ({
    captchaUrl:state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})
export default connect(mapStateToProps, { login })(Login);