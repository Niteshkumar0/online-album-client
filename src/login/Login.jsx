import React, { useState } from 'react'
import  login from './login.module.css'
import {useNavigate} from 'react-router-dom'
import {ToastContainer,toast} from 'react-toastify'
import { Link } from 'react-router-dom'
import axios from 'axios'
const Login = () => {

  let navigate = useNavigate()
  let [loginValue,setLoginValue] = useState({
    name:"",
    email:"",
    password:"",
  })

  
  let handleData = (event) => {
    setLoginValue({...loginValue,[event.target.name]:event.target.value})
  }
  


  let ToastOption = {
    position:'bottom-right',
    autoClose:'8000',
    theme:"dark",
}
  let handleValidation = () => {
    let {name,email,password} = loginValue
    if(name === "" && email === "" && password === ""){
      toast.error('please provide information',ToastOption)
      return false
    }
    else if (name.length < 3){
      toast.error('invalid name',ToastOption)
      return false
    }else if (email == "") {
      toast.error('please provide email ',ToastOption)
      return false
    }
    return true
}

  
  let handleSubmit = async (e) => {
    e.preventDefault()
    if (handleValidation()) {
      let {name,email,password} = loginValue

     let user = await axios.post('http://localhost:3001/login',{
        name,
        email,
        password
       })
      
      if (user.data.status === false) {
        return toast.error(user.data.msg,ToastOption)
      }else if(user.data.status === true) {
        let user = {
          name,
          email
        }
        await localStorage.setItem('users',JSON.stringify(user))
         return navigate('/')
      }
    console.log(user)

    }
  }

  return (
    <>
    <section className={login.container}>
        <div className={login.formContainer}>
          <form onSubmit={(e)=>handleSubmit(e)}>
          <h1 className={login.mainHeading}>Login</h1>
            <div>
              <label htmlFor="" className=''>Name</label>
              <input type="text" 
                     name="name" 
                     placeholder='Username...' 
                     id="name"
                     onChange={(e)=> handleData(e)} />
            </div>
            <div>
              <label htmlFor="" className=''>Email</label>
              <input type="email"
                     name="email"
                     placeholder='Email...'
                     id="email"
                     onChange={(e)=> handleData(e)} />
            </div>
            <div>
              <label htmlFor="" className=''>Password</label>
              <input type="password"
                     name="password" 
                     placeholder='Password...'
                     id="password"
                     onChange={(e)=> handleData(e)} />
            </div>
           
            <button className={login.btn}> Login</button>
            <p className={login.login}>not have account? <Link to='/register' className={login.loginLink}>Register</Link> </p>
            </form>
        </div>
    </section>
    <ToastContainer/>
    </>
  )
}

export default Login