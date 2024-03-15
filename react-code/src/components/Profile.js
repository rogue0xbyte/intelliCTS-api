import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

 import procDiagram from '../static/procDiagram.png';

const Dashboard = () => {
  const [cheque_no, setChequeNumber] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [micr, setMicr] = useState('');
  const [responseData, setResponseData] = useState('');
  const baseUrl = 'http://localhost:3000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Send a POST request with the input data
    const seshKey = sessionStorage.getItem('session_key');

    const response = await fetch(`${baseUrl}/cheque/cheque-status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${seshKey}` // Add Authorization header with bearer token
      },
      body: JSON.stringify({ cheque_no, ifsc, micr })
    });
      console.log(JSON.stringify({ cheque_no, ifsc, micr }));

    // Handle response data
    const data = await response.json();
    console.log(data, data.status);
    setResponseData(data);
  };

  return (
    <div className="main" style={{ display: "flex" }}>
      <div className="glass navbar" style={{ display: "block", width: "30%" }}>
        <div className="nav-logo">
          <p>intelliCTS</p>
          <hr />
          <p>Secure next-generation Cheque Truncation Suite for banking services</p><br />
        </div>
        <div className="nav-links" style={{ display: "block" }}>
          <a href="/upload">Upload Cheques</a><br/><br/>
          <a href="/lookup">Cheque Lookup</a><br/><br/>
          <a href="/profile">Edit Profile</a><br/><br/>
          <a href="/logout">Logout</a>
        </div>
      </div>
      <div className="glass main" style={{ display: "block" }}>
        <div
          className={`glass`}
          style={{ width: '100%', height: '75%', padding: '25px' }}
        >
        <br/>
          <div className="row spacious">
            <h1>Profile Settings</h1>
          </div>
          <div className="row spacious">
              <input type="text" placeholder="Email" value={cheque_no} onChange={(e) => setChequeNumber(e.target.value)} />
          </div><br/>
          <div className="row spacious">
              <select>
                <option value="">Select Institution Type</option>
                <option value="bank">Bank</option>
                <option value="clearing_house">Clearing House</option>
              </select>
          </div>
          <br/><br/>
          <div className="row spacious">
            <button>Update</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;