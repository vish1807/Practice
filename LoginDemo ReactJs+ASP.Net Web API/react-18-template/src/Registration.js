import React, { useState } from 'react';
import axios from 'axios';

const Registration = () => {
    const [name, setName] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [address, setAddress] = useState('');

    const handleNameChange = (value) => {
        setName(value);
    }

    const handlePhoneNoChange = (value) => {
        setPhoneNo(value);
    }

    const handleAddressChange = (value) => {
        setAddress(value);
    }
    const handleRegister = () => {
        const data = {
            Name: name,
            PhoneNo: phoneNo,
            Address: address,
            IsActive: 1
        }
        axios.post('https://localhost:44309/api/Test/Registration', data)
            .then(response => {
                console.log(response.data);
                alert("Registered Successfully " + response.data)
            })
            .catch(error => {
                console.error('There was an error registering! ', error);
            }).finally(() => {
                setName('');
                setAddress('');
                setPhoneNo('');
            });
    }


    return (
        <>
            <div>Registration</div>
            <label>Name</label>
            <input type="text" id="txtName" placeholder="Enter your name" onChange={(e) => handleNameChange(e.target.value) } /><br />
            <label>Phone No</label>
            <input type="text" id="txtPhoneNo" placeholder="Enter your phone number" onChange={(e) => handlePhoneNoChange(e.target.value)} /><br />
            <label>Address</label>
            <input type="text" id="txtAddress" placeholder="Enter your address" onChange={(e) => handleAddressChange(e.target.value)} /><br />
            <button id="btnRegister" onClick={() => handleRegister()}>Register</button>
            
        </>
    )
}

export default Registration;