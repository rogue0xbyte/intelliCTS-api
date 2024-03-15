import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css'; // Import CSS file

const Login = () => {

  const baseUrl = 'http://localhost:3000';

  const [password, setPassword] = useState(''); // State for password
  const [userId, setUserId] = useState(''); // State for password
  const navigate = useNavigate();

  const handlePassInputChange = (event) => {
    setPassword(event.target.value); // Update password state on input change
  };

  const handleIdInputChange = (event) => {
    setUserId(event.target.value); // Update password state on input change
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    // You can add your login logic here, for demonstration purposes, let's just check if the password is "password"

    var seshKey = '';
    console.log("prevented default");


    fetch(`${baseUrl}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password: password,
        email: userId
      })
    })
      .then(response => {
        console.log("Sent req.");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Login successful:', data);
        seshKey = data.token;
        // Handle successful login response here
        sessionStorage.setItem('logged_in', 'true');
        sessionStorage.setItem('session_key', seshKey);
        navigate('/upload');
        // Handle successful login response here
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle error here
      });
  };

  return (
    <div className="main">
      <div className="glass navbar">
        <div className="nav-logo">
          <p>intelliCTS</p>
        </div>
      </div>
      <div className="glass main">
        <div className="row">
          <div className=" glass login_box" style={{ width: '45%' }}>
           <form onSubmit={handleSubmit} className="login_box_form">
            <div className="row spacious">
              <h3>Welcome Back!</h3>
            </div>
            <br/>
            <div className="row spacious">
              <h3>Enter Email</h3>
              <input type="text" 
                  name="userId" 
                  value={userId} // Bind input value to password state
                  onChange={handleIdInputChange} // Call handleInputChange on input change
                  className="userId"/>
            </div>
            <div className="row spacious">
              <h3>Enter Password</h3>
              <input type="password" 
                  name="password" 
                  value={password} // Bind input value to password state
                  onChange={handlePassInputChange} // Call handleInputChange on input change
                  className="password"/>
            </div>
            <br/>
            <div className="row spacious">
              <input type="submit" 
                  value="Submit"/>
            </div>
           </form>
          </div>
          <div className="login_box" style={{ width: '45%', textAlign: 'center', display: "block" }}>
            <div className="nav-logo hero-logo row" style={{ textAlign: 'center' }}>
              <h1 style={{ textAlign: 'center', textTransform: 'none' }}>intelliCTS</h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<h2 style={{ textTransform: 'none' }}>Cheque Truncation System</h2>
            </div>
            <br/>
            <p>Secure next-generation CTS suite for banking.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;