import React from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import { useState} from 'react';
import '../css/Login.css';
axios.defaults.withCredentials = true;

const Login = () => {

    const initialInputValues = { email:"", pwd:""};
    const [loginValues, setLoginValues] = useState(initialInputValues);
    const inputErrors = {email:"", pwd:""};
    const [loginError, setLoginError] = useState(inputErrors)
    const [isLoading, setIsLoding] = useState(false);
    const navigate = useNavigate();

const handleChange = (e) => {
    const {name, value} = e.target
    setLoginValues({...loginValues, [name]:value})
    if(e.target.name === "email"){
        setLoginError({...loginError, email:''})
    }
    if(e.target.name === "pwd"){
        setLoginError({...loginError, pwd:''})
    }
}
  
const handleSubmit =async(e) => {
    e.preventDefault();
    setIsLoding(true)
    console.log('result')

    if(!loginValues.email.length > 0 || !loginValues.pwd.length > 0){
       if(!loginValues.email.length > 0){
            setLoginError({...loginError, email:'This field cannot be empty', pwd:'' })
            setIsLoding(false)
            return; }
       if(!loginValues.pwd.length > 0){
            setLoginError({...loginError, email:'', pwd:'This field cannot be empty' })
            setIsLoding(false)
            return; }
    }
         try{
            const result = await axios.post('api/login', {loginValues}, {withCredentials:true})
            // const result = await axios.post('http://localhost:5000/api/login', {loginValues}, {withCredentials:true})
                if(result.statusText) {
                    if(result.data.verify){
                        setIsLoding(false);
                            setLoginValues(initialInputValues)
                            setLoginError({...loginError, email:'', pwd:'' })
                            navigate('/orders', {replace:true})
                        }else{
                            setLoginValues(initialInputValues)
                            setLoginError({...loginError, email:'', pwd:'' })
                            // alert(`${result.data.user} was successfully logged in`)
                            navigate('/', {replace:true})
                        }
                } 
        }
                catch(error){
                    setIsLoding(false)
                    setLoginError({...loginError, 
                        email:error.response.data.email, 
                        pwd:error.response.data.pwd
                    })  
                } 
        }
    return (
        <div className="sbg">
            <div className="loginContainer">
                {isLoading && <div className="tc">Loading</div>}
                <p className="header">LOGIN</p>
                <form className="form" onSubmit={ handleSubmit }>
                    <div className="login">
                        <label className="loginLabel">EMAIL ADDRESS</label>
                        <input className="loginInput bg-white" type="text" name="email" value={loginValues.email} onChange={handleChange} placeholder="john@example.com"/>
                    </div>
                    { loginError.email.length > 0 && <div className="loginError">{loginError.email}</div> }
                    <div className="loginFlex">
                        <label className="loginLabel2">PASSWORD</label>
                        <Link to="/forgetpassword" className="loginF">Forget Password</Link>
                    </div>
                        <input className="loginInput bg-white" type="password" name="pwd" value={loginValues.pwd} onChange={handleChange} placeholder="password"/>
                        { loginError.pwd.length > 0 && <div className="loginError">{loginError.pwd}</div> }
                    <button className="loginBtn">LOGIN</button>
                </form>
                <p className="loginP" >Not a member?<Link to="/signup" className="loginF">Sign Up</Link></p>
            </div>
        </div>
    )
}

export default Login
