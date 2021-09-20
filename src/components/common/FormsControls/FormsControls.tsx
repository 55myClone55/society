import React, { FC } from "react";
import styles from './FormsControls.module.css';
import { Field, reduxForm, WrappedFieldProps } from "redux-form";
import { FieldValidatorType } from "../../../utils/validator/validators";
//import { FC } from "react";
import {WrappedFieldMetaProps} from 'redux-form/lib/Field' 


type FormControlPropsType = {
   meta: WrappedFieldMetaProps
         
}
//type FormControlType = (params:FormControlParamstype)=> React.ReactNode
//@ts-ignore
function FormControl:React.FC<FormControlPropsType>({ meta: { touched, error }, children }){
    const hasError = touched && error
    return (
        <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}
//@ts-ignore
export const Textarea:React.FC<WrappedFieldProps> = (props) => {
    const { input, meta, ...restProps } = props
    //@ts-ignore
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}
//@ts-ignore
export function Input:React.FC<WrappedFieldProps>(props){
    const { input, meta, ...restProps } = props
    return <FormControl {...props}><input {...input}{...restProps} /></FormControl>

}



export function createField<FormKeysType extends string>(placeholder:string | undefined,
     name:FormKeysType, 
     validators:Array<FieldValidatorType>,
      component:React.FC<WrappedFieldProps>, 
      props = {}, text = '') {
          
    return <div>
   
        <Field placeholder= {placeholder} name={name}
            validate={validators}
            component={component}
            {...props}
        />{text}
    </div>
    
}
