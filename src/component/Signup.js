import {React, useState} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import '../css/Signup.css';

const Signup = () => {
  const initialInputValues = {username:"", email:"", pwd:""};
  const [signupValues, setSignupValues] = useState(initialInputValues);
  const inputErrors = {username:"", email:"", pwd:""};
  const [signupError, setSignupError] = useState(inputErrors)
  const [isLoading, setIsLoding] = useState(false);
  const [verificationError, setVerificationError] = useState('');
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
//   const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target
    setSignupValues({...signupValues, [name]:value})
    setSignupError({...signupError, username:'', email:'', pwd:'' })
}
    const handleSubmit = async(e) => {
        e.preventDefault();
        setIsLoding(true)
        // setVerificationError('');
        // console.log('sign up');
    
             try{
                const result = await axios.post('https://burger-userbackend.herokuapp.com/api/signup', {signupValues});
                // const result = await axios.post('http://localhost:5000/api/signup', {signupValues})
                setIsLoding(false);
                setSignupError({...signupError, username:'', email:'', pwd:'' })
                setVerificationError(result.data.status)
                setMessage(result.data.message)
                setSuccess(true)
                setSignupValues(initialInputValues)
                // navigate('/login')
                }
             catch(error){
                    setIsLoding(false)
                    setSignupError({...signupError, 
                        email:error.response.data.email, 
                        username:error.response.data.username, 
                        pwd:error.response.data.pwd
                 }); 
                }
}
    return (<div>
        {!success ? 
            <div className="sbg" >
                <div className="signupContainer">
                    {/* {verificationError.length > 0 && <div><h6>{verificationError}</h6></div>} */}
                    {isLoading && <div className="tc">Loading</div>}
                    <p className="signupheader">SIGNUP</p>
                <form  className="signUP" onSubmit={handleSubmit}>
                    <div className="signUP">
                        <label className="signupLabel">FULLNAME</label>
                        <input className="signupInput bg-white" onChange={handleChange} name="username" value={signupValues.username} type="text" placeholder="John Doe"/>
                        { signupError.username.length > 0 && <div className="signError">{signupError.username}</div> }
                    </div>
                    <div className="signUP">
                        <label className="signupLabel">EMAIL ADDRESS</label>
                        <input className="signupInput bg-white" onChange={handleChange} name="email" value={signupValues.email} type="text" placeholder="john@example.com"/>
                        { signupError.email.length > 0 && <div className="signError">{signupError.email}</div> }
                    </div>
                    <div className="signUP">
                        <label className="signupLabel2">PASSWORD</label>
                        <input className="signupInput bg-white" onChange={handleChange} type="text" name="pwd" value={signupValues.pwd} placeholder="password"/>
                    </div>
                    { signupError.pwd.length > 0 && <div className="signError">{signupError.pwd}</div> }
                    <button className="signupBtn">REGISTER</button>
                </form>
                <p className="signupP">Already a member?<Link to="/login" className="signupF">Login</Link></p>
                </div>
            </div>:
            <div className="sbg2" >
                <div className="signupContainer2">
                    <h1 style={{color:"green", textAlign:"center"}}>{verificationError}: { message }</h1>
                </div>
            </div>
        }
    </div>)
}

export default Signup
