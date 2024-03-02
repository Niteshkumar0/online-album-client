import React,{useEffect, useState} from 'react'
import  register from './register.module.css'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
const Register = () => {

  let navigate = useNavigate()

  let ToastOption = {
    position:'bottom-right',
    autoClose:'8000',
    // pauseOnHover:true,
    // draggable:true,
    theme:"dark",
}


  let [registerValue,setRegisterValue] = useState({
    name:"",
    email:"",
    password:"",
    confirmPassword:""
  })

  let handleValidation = () => {
    if (registerValue.name == "") {
      toast.error('name shouldnot be empty',ToastOption)
      return false
    }else if (registerValue.email == "") {
      toast.error('email shouldnot be empty',ToastOption)
      return false
    } else if (registerValue.name.length < 3){
      toast.error('name mestbe atleast 3 character',ToastOption)
      return false
    } else if (registerValue.password.length < 8 ){
      toast.error('password mustbe atleast 8 character/numbers',ToastOption)
      return false
    } else if (registerValue.password !== registerValue.confirmPassword){
      toast.error('npassword and confirm password mustbe same',ToastOption)
      return false
    }
    return true
  }

  let handleSubmit = async (e) => {
    e.preventDefault()
      if (handleValidation()) {
        let {name,email,password} = registerValue
        let user = await axios.post('http://localhost:3001/register',{
          name,
          email,
          password,
        })
        if (user.data.status === false ) {
          return toast.error(`${user.data.msg}`,ToastOption)
        }
        navigate('/login')
      }
  }


  let handleData = (event) => {
      setRegisterValue({...registerValue,[event.target.name]:event.target.value})
  }
  return (
    <>
    <section className={register.container}>
        <div className={register.formContainer}>
          <form onSubmit={(e)=>handleSubmit(e)}>
          <h1 className={register.mainHeading}>Register</h1>
            <div>
              <label htmlFor="" className=''>Name</label>
              <input type="text"
                     name="name"
                     placeholder='Username...'
                     id="name"
                     onChange={(e)=> handleData(e)} />
            </div>
            <div>
              <label htmlFor="email" className=''>Email</label>
              <input type="email"
                     name="email"
                     placeholder='Email...'
                     id="email"
                     onChange={(e)=> handleData(e)} />
            </div>
            <div>
              <label htmlFor="password" className=''>Password</label>
              <input type="password"
                     name="password"
                     placeholder='Password...'
                     id="password"
                     onChange={(e)=> handleData(e)} />
            </div>
            <div>
              <label htmlFor="" className=''>Confirm Password</label>
              <input type="password"
                     name="confirmPassword"
                     placeholder='Confirm Password...'
                     id="confirmPassword"
                     onChange={(e)=> handleData(e)} />
            </div>
            <button type="submit" className={register.btn} > Register</button>
            <p className={register.login}>already account? <Link to='/login' className={register.loginLink}>Login</Link> </p>
        </form>
        </div>
    </section>
    <ToastContainer/>
    </>
  )
}

export default Register