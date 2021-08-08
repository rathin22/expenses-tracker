import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import './SignIn.css';
import UserContext from './UserContext';

function SignIn(){

    var [ErrorMsg, setErrorMsg] = useState("");
    const {User, setUser} = useContext(UserContext);
    let history = useHistory();
    useEffect(() => {
        //Add event listener for log in button
        document.getElementById('login-form').addEventListener('submit', async (event)=>{
            event.preventDefault();
            const formData = new FormData();
            formData.append('email', document.getElementById('email').value);
            formData.append('password', document.getElementById('password').value);
            let response = await fetch('http://127.0.0.1:8080/sign-in', {
            method: 'POST',
            body: formData,
        })
        if(response.ok){
            let userData = await response.json();
            console.log(userData);
            setUser(userData);
            
            history.push("/");
        } 
        else{
            let error = await response.text()
            setErrorMsg(error);
        }
        /* .then(response => {response.text()})
        .then(data => {
            if(response.ok){
                console.log('tes')
                props.changeSignedInStatus();
            }
            else{
                console.log('no');
                setErrorMsg(data);
            }               
        }) */
        })
        
    }, []);
    

    return(
        <div id="sign-in">
            <div className="container login-container">
                <div className="row signin">
                    <div className="col-xl-4 col-12 mycol" id="sign-in-msg">
                        Please <br/>Sign In to continue
                    </div>
                    <div className="col-lg-8 col-12 align-self-center mycol" id="sign-in-form">
                        <form id="login-form">
                            <label style={{color: '#00FED4'}} className="login-label">Email ID:
                                <input type="text" id="email" name="email" className="log-in-input"/>
                            </label>
                            <label style={{color: '#00FED4'}} className="login-label">Password:
                                <input type="password" id="password" name="password" className="log-in-input"/>
                            </label>
                            <p id="errorMsg">{ErrorMsg}</p>
                            <button type="submit" className="login-btn">Log In</button>
                            <button className="login-btn">Register</button>
                        </form>
                    </div>        
                </div>
        </div>
        </div>
    )
}


export default SignIn;