import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {MyTextInput} from '../components/TextInput'
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom'
import {loginFormInputs} from '../constans/forms'


const formCreator = ()=> (
    loginFormInputs.map((form, key)=>(
      <MyTextInput 
      name={form.field} 
      type={form.type} 
      placeholder={form.placeholder} 
      key={key} 
      />
    ))
  )

export const LoginForm = (props) => {

let history = useHistory()

const goToRegister = () => history.push('/')
const goToProtected = ()=> history.push('/homepage')

  return (
    <>
      <h1>Login</h1>
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validationSchema={Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
        password: Yup.string()
            .min(3)
            .required('Required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            props.auth.authenticate()
            goToProtected()
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form >
          {formCreator()}
          <Grid>
            <button type='submit'>Login</button>
          </Grid>
          <Grid>
            <button onClick={goToRegister} type="button">Register</button>
          </Grid>
          
        </Form>
      </Formik>
    </>
  );
};