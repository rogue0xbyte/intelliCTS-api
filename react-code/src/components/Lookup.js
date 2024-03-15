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
          <a href="/upload">Upload Cheques</a><br /><br />
          <a href="/lookup">Cheque Lookup</a><br /><br />
          <a href="/profile">Edit Profile</a><br /><br />
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
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Cheque Number" value={cheque_no} onChange={(e) => setChequeNumber(e.target.value)} />
              <input type="text" placeholder="IFSC" value={ifsc} onChange={(e) => setIfsc(e.target.value)} />
              <input type="text" placeholder="MICR" value={micr} onChange={(e) => setMicr(e.target.value)} />&nbsp;&nbsp;&nbsp;&nbsp;
              <button type="submit">Look-Up</button>
            </form>
          </div>
          <div className="row spacious">
            <pre>{responseData && 'Status: ' + responseData.status}</pre>
          </div>
          <br/><br/>
          <div className="row spacious">
            <div>
              <h2>Process Diagram</h2>
              <p>BN => Bank<br/>
              CH => Clearing House</p>
            </div>
            <img src={procDiagram} style={{ width: "80%" }}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;