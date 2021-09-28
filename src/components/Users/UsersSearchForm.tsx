import React, {FC} from "react";
import { UserType } from "../../types/types";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {Formik,Form,Field} from 'formik'
import { FilterType } from "../redux/users_reducer";
import { useSelector } from "react-redux";
import { getUsersFilter } from "../redux/users-selectors";

const usersSearchFormValidade = (values:any) =>{
          const errors = {};
        return errors;
      }
type FriendFormType = 'true' | 'false' | 'null'
      type FormType = {
        term: string
        friend:FriendFormType
    }

type PropsType = {
    onFilterChanged:(filter:FilterType)=>void
}
     

  export  const UsersSearchForm:React.FC<PropsType> = React.memo((props) =>{

const filter = useSelector(getUsersFilter)

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
enableReinitialize
       initialValues={{ term: filter.term,friend: String(filter.friend) as FriendFormType }}
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