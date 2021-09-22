import React, {FC} from "react";
import { UserType } from "../../types/types";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {Formik,Form,Field} from 'formik'
import { FilterType } from "../redux/users_reducer";

const usersSearchFormValidade = (values:any) =>{
          const errors = {};
        return errors;
      }

      type FormType = {
        term: string
        friend:'true' | 'false' | 'null'
    }

type PropsType = {
    onFilterChanged:(filter:FilterType)=>void
}
     

  export  const UsersSearchForm:React.FC<PropsType> = React.memo((props) =>{

const submit = (values:FormType, { setSubmitting }:{ setSubmitting:(isSubmitting:boolean)=>void }) => {
  const filter:FilterType = {
    term: values.term,
    friend:values.friend === 'null' ? null : values.friend === 'true' ? true:false 
   }  
  
  props.onFilterChanged(filter)
    setSubmitting(false)
  }

        return <div>
<Formik
       initialValues={{ term: '',friend:'null' }}
       validate={usersSearchFormValidade}
       onSubmit={submit}
     >
       {({ isSubmitting }) => (
         <Form>
           <Field type="text" name="term" />
           <Field name="friend" as="select">
   <option value="null">All</option>
   <option value="true">Only followed</option>
   <option value="false">only unfollowed</option>
 </Field>
           <button type="submit" disabled={isSubmitting}>
             Submit
           </button>
         </Form>
       )}
     </Formik>
        </div>
    })

export default usersSearchFormValidade;