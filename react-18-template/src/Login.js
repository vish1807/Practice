import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [name, setName] = useState('');
    const [phoneNo, setPhoneNo] = useState('');

    const handleNameChange = (value) => {
        setName(value);
    }

    const handlePhoneNoChange = (value) => {
        setPhoneNo(value);
    }
    const handleLogin = () => {
        const data = {
            Name: name,
            PhoneNo: phoneNo
        }
        axios.post('https://localhost:44309/api/Test/Login', data)
            .then(response => {
                console.log(response.data);
                alert("Login Successfully " + response.data)
            })
            .catch(error => {
                console.error('There was an error logging in! ', error);
            }).finally(() => {
                setName('');
                setPhoneNo('');
            });
    }
    return (       

        <>
            <div>Login</div>
            <label>User Name</label>
            <input type="text" id="txtUserName" placeholder="Enter your user name" onChange={(e) => handleNameChange(e.target.value)} /><br />
            <label>Password</label>
            <input type="password" id="txtPassword" placeholder="Enter your password" onChange={(e) => handlePhoneNoChange(e.target.value)} /><br />
            <button id="btnLogin" onClick={() => handleLogin() }>Login</button>
        </>
        )
}

export default Login;