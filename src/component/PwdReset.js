import { useParams, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import '../css/Forgot.css'
import axios from 'axios';

    const PwdReset = () => {
        const [pwd, setPwd] = useState('');
        const [pwd2, setPwd2] = useState('');
        const [pwdError, setPwdError] = useState('');
        const [pwdError2, setPwdError2] = useState('');
        const [isLoading, setIsLoading] = useState(false);
        const [forgottenError, setForgottenError] = useState('');
        const navigate = useNavigate();

        const { email } = useParams();

        const handleSubmit =async(e) => {
            e.preventDefault();
            setIsLoading(true);
            setPwdError('');
            setPwdError2('');
            setForgottenError('')
            if(pwd.length < 6 || pwd2.length < 6){
                if(pwd.length < 6 ){
                    setPwdError("This field can't be empty and shouldn't be less than six characters")
                    setIsLoading(false);
                }else if(pwd2.length < 6){
                    setPwdError2("This field can't be empty and shouldn't be less than six characters")
                    setIsLoading(false);
                }
            }
            else{
                if(pwd !== pwd2){
                    setIsLoading(false)
                    setPwdError('Password does not match')
                    setPwd("")
                    setPwd2("")
                }else{
                    try{
                       const result = await axios.post('https://burger-userbackend.herokuapp.com/api/pwdreset', {email, pwd}, {withCredentials:true});
                    // const result = await axios.post('http://localhost:5000/api/pwdreset', {email, pwd}, {withCredentials:true})
                       setIsLoading(false);
                       setForgottenError(result.data)
                        setPwd("")
                        setPwd2("")
                        navigate('/login')
                    }
                     catch(error){
                        setIsLoading(false);
                        setForgottenError(error.response.data)
                     }
                }
            }
        }

        return (
            <div className="sbg">
                <div className="forgotContainer">
                {isLoading && <div className="tc"><h4>Loading...</h4></div>}
                {forgottenError.length > 0 && <div className="tc loginError"><h7>{forgottenError}</h7></div>}
                    <p className="header">PASSWORD RESET</p>
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="login">
                            <label className="loginLabel">ENTER PASSWORD</label>
                            <input className="loginInput bg-white" type="text" name="pwd" value={pwd} onChange={(e)=>{setPwd(e.target.value); setPwdError('')}} placeholder="john@example.com"/>
                            { pwdError.length > 0 && <div className="loginError">{pwdError}</div> }
                        </div>
                        <div className="login">
                            <label className="loginLabel">RE-ENTER PASSWORD</label>
                            <input className="loginInput bg-white" type="text" name="pwd2" value={pwd2} onChange={(e)=>{setPwd2(e.target.value); setPwdError2('')}} placeholder="john@example.com"/>
                            { pwdError2.length > 0 && <div className="loginError">{pwdError2}</div> }
                        </div>
                        <button className="loginBtn">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
    
    export default PwdReset
    