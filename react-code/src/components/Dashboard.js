import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const Dashboard = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadedTextVisible, setUploadedTextVisible] = useState(false);
  const baseUrl = 'http://localhost:3000';
  const SAMPLE_CHEQUES = [
    {
      "micr": "110002002",
      "bank_name": "National Bank of India",
      "bank_branch": "Mumbai Main Branch",
      "ifsc": "NBIN0000001",
      "credit_to": "Government of India - Ministry of Finance",
      "signature_image": "https://nationalbankofindia.com/signatures/nbi_signature.png",
      "cheque_no": "123456",
      "rbi_ac_no": "001234",
      "txn_code": "123",
      "ddmmyyyy": "14-03-2024"
    },
    {
      "micr": "220003003",
      "bank_name": "Central Bank of Kuwait (India)",
      "bank_branch": "Delhi Main Branch",
      "ifsc": "CBKI0000001",
      "credit_to": "ABC Corporation",
      "signature_image": "https://centralbankofkuwait.com/signatures/cbki_signature.png",
      "cheque_no": "789012",
      "rbi_ac_no": "005678",
      "txn_code": "456",
      "ddmmyyyy": "15-03-2024"
    },
    {
      "micr": "330004004",
      "bank_name": "Indian Bank of India",
      "bank_branch": "Chennai Main Branch",
      "ifsc": "IBIN0000001",
      "credit_to": "XYZ Corporation",
      "signature_image": "https://indianbankofindia.com/signatures/ibi_signature.png",
      "cheque_no": "345678",
      "rbi_ac_no": "009876",
      "txn_code": "789",
      "ddmmyyyy": "16-03-2024"
    },
    {
      "micr": "440005005",
      "bank_name": "State Bank of America (India)",
      "bank_branch": "Bangalore Main Branch",
      "ifsc": "SBAM0000001",
      "credit_to": "DEF Corporation",
      "signature_image": "https://statebankofamerica.com/signatures/sbam_signature.png",
      "cheque_no": "901234",
      "rbi_ac_no": "012345",
      "txn_code": "1011",
      "ddmmyyyy": "17-03-2024"
    },
    {
      "micr": "550006006",
      "bank_name": "United Bank of India",
      "bank_branch": "Kolkata Main Branch",
      "ifsc": "UBIN0000001",
      "credit_to": "GHI Corporation",
      "signature_image": "https://unitedbankofindia.com/signatures/ubi_signature.png",
      "cheque_no": "567890",
      "rbi_ac_no": "015678",
      "txn_code": "1213",
      "ddmmyyyy": "18-03-2024"
    },
    {
      "micr": "660007007",
      "bank_name": "Bank of China (India)",
      "bank_branch": "Mumbai Main Branch",
      "ifsc": "BOCI0000001",
      "credit_to": "JKL Corporation",
      "signature_image": "https://bankofchina.com/signatures/boci_signature.png",
      "cheque_no": "234567",
      "rbi_ac_no": "018901",
      "txn_code": "1415",
      "ddmmyyyy": "19-03-2024"
    },
    {
      "micr": "770008008",
      "bank_name": "Hong Kong and Shanghai Banking Corporation (India)",
      "bank_branch": "Delhi Main Branch",
      "ifsc": "HSBC0000001",
      "credit_to": "MNO Corporation",
      "signature_image": "https://hsbc.com/signatures/hsbc_signature.png",
      "cheque_no": "890123",
      "rbi_ac_no": "021234",
      "txn_code": "1617",
      "ddmmyyyy": "20-03-2024"
    },
    {
      "micr": "880009009",
      "bank_name": "Deutsche Bank (India)",
      "bank_branch": "Chennai Main Branch",
      "ifsc": "DBIN0000001",
      "credit_to": "PQR Corporation",
      "signature_image": "https://deutschebank.com/signatures/dbi_signature.png",
      "cheque_no": "456789",
      "rbi_ac_no": "024567",
      "txn_code": "1819",
      "ddmmyyyy": "21-03-2024"
    },
    {
      "micr": "990001001",
      "bank_name": "Bank of America (India)",
      "bank_branch": "Bangalore Main Branch",
      "ifsc": "BOAI0000001",
      "credit_to": "STU Corporation",
      "signature_image": "https://bankofamerica.com/signatures/boai_signature.png",
      "cheque_no": "012345",
      "rbi_ac_no": "027890",
      "txn_code": "2021",
      "ddmmyyyy": "22-03-2024"
    },
    {
      "micr": "001002002",
      "bank_name": "Royal Bank of Scotland (India)",
      "bank_branch": "Kolkata Main Branch",
      "ifsc": "RBIN0000001",
      "credit_to": "VWX Corporation",
      "signature_image": "https://royalbankofscotland.com/signatures/rbin_signature.png",
      "cheque_no": "678901",
      "rbi_ac_no": "030123",
      "txn_code": "2223",
      "ddmmyyyy": "23-03-2024"
    },
    {
      "micr": "002003003",
      "bank_name": "Citibank (India)",
      "bank_branch": "Mumbai Main Branch",
      "ifsc": "CITI0000001",
      "credit_to": "YZA Corporation",
      "signature_image": "https://citibank.com/signatures/citi_signature.png",
      "cheque_no": "234567",
      "rbi_ac_no": "033456",
      "txn_code": "2425",
      "ddmmyyyy": "24-03-2024"
    },
    {
      "micr": "003004004",
      "bank_name": "Standard Chartered Bank (India)",
      "bank_branch": "Delhi Main Branch",
      "ifsc": "SCBI0000001",
      "credit_to": "ZAB Corporation",
      "signature_image": "https://standardchartered.com/signatures/scbi_signature.png",
      "cheque_no": "890123",
      "rbi_ac_no": "036789",
      "txn_code": "2627",
      "ddmmyyyy": "25-03-2024"
    },
    {
      "micr": "004005005",
      "bank_name": "Bank of Tokyo-Mitsubishi UFJ (India)",
      "bank_branch": "Chennai Main Branch",
      "ifsc": "BTMU0000001",
      "credit_to": "BCD Corporation",
      "signature_image": "https://btmufj.com/signatures/btmufj_signature.png",
      "cheque_no": "456789",
      "rbi_ac_no": "039012",
      "txn_code": "2829",
      "ddmmyyyy": "26-03-2024"
    },
    {
      "micr": "005006006",
      "bank_name": "Barclays Bank (India)",
      "bank_branch": "Bangalore Main Branch",
      "ifsc": "BARC0000001",
      "credit_to": "CDE Corporation",
      "signature_image": "https://barclaysbank.com/signatures/barc_signature.png",
      "cheque_no": "012345",
      "rbi_ac_no": "042345",
      "txn_code": "3031",
      "ddmmyyyy": "27-03-2024"
    },
    {
      "micr": "006007007",
      "bank_name": "Mizuho Bank (India)",
      "bank_branch": "Kolkata Main Branch",
      "ifsc": "MIZU0000001",
      "credit_to": "DEF Corporation",
      "signature_image": "https://mizuhobank.com/signatures/mizu_signature.png",
      "cheque_no": "678901",
      "rbi_ac_no": "045678",
      "txn_code": "3233",
      "ddmmyyyy": "28-03-2024"
    },
    {
      "micr": "007008008",
      "bank_name": "BNP Paribas (India)",
      "bank_branch": "Mumbai Main Branch",
      "ifsc": "BNPA0000001",
      "credit_to": "EFG Corporation",
      "signature_image": "https://bnpparibas.com/signatures/bnp_signature.png",
      "cheque_no": "234567",
      "rbi_ac_no": "048901",
      "txn_code": "3435",
      "ddmmyyyy": "29-03-2024"
    },
    {
      "micr": "008009009",
      "bank_name": "Credit Suisse (India)",
      "bank_branch": "Delhi Main Branch",
      "ifsc": "CRSU0000001",
      "credit_to": "FGH Corporation",
      "signature_image": "https://creditsuisse.com/signatures/crsu_signature.png",
      "cheque_no": "890123",
      "rbi_ac_no": "052345",
      "txn_code": "3637",
      "ddmmyyyy": "30-03-2024"
    },
    {
      "micr": "009001001",
      "bank_name": "HSBC Holdings (India)",
      "bank_branch": "Chennai Main Branch",
      "ifsc": "HSBH0000001",
      "credit_to": "GHI Corporation",
      "signature_image": "https://hsbcholdings.com/signatures/hsbh_signature.png",
      "cheque_no": "456789",
      "rbi_ac_no": "055678",
      "txn_code": "3839",
      "ddmmyyyy": "31-03-2024"
    },
    {
      "micr": "001010010",
      "bank_name": "UBS Group (India)",
      "bank_branch": "Bangalore Main Branch",
      "ifsc": "UBSG0000001",
      "credit_to": "HIJ Corporation",
      "signature_image": "https://ubs.com/signatures/ubsg_signature.png",
      "cheque_no": "012345",
      "rbi_ac_no": "058901",
      "txn_code": "4041",
      "ddmmyyyy": "01-04-2024"
    },
    {
      "micr": "010011011",
      "bank_name": "Morgan Stanley (India)",
      "bank_branch": "Kolkata Main Branch",
      "ifsc": "MORG0000001",
      "credit_to": "IJK Corporation",
      "signature_image": "https://morganstanley.com/signatures/morg_signature.png",
      "cheque_no": "678901",
      "rbi_ac_no": "062345",
      "txn_code": "4243",
      "ddmmyyyy": "02-04-2024"
    }
  ];

  const onDrop = (acceptedFiles) => {
    // Append dropped files to the existing uploadedFiles array
    setUploadedFiles([...uploadedFiles, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleFileInputChange = (e) => {
    // Handle file input change
    const files = e.target.files;
    setUploadedFiles([...uploadedFiles, ...files]);
  };

  const handleRemoveFile = (index) => {
    // Remove file from uploadedFiles array
    const newFiles = [...uploadedFiles];
    newFiles.splice(index, 1);
    setUploadedFiles(newFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Select a random subset of objects from SAMPLE_CHEQUES
    const numberOfFiles = uploadedFiles.length;
    const selectedCheques = SAMPLE_CHEQUES.sort(() => 0.5 - Math.random()).slice(0, numberOfFiles);

    console.log(selectedCheques);
    
    // Send a POST request with selectedCheques
    const seshKey = sessionStorage.getItem('session_key');

    const response = await fetch(`${baseUrl}/cheque/upload-cheques`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${seshKey}` // Add Authorization header with bearer token
      },
      body: JSON.stringify({ cheques: selectedCheques })
    });

    // Handle response as needed
    console.log(await response.json());

    // Show the text "Cheque is uploaded" for 2 seconds
    setUploadedTextVisible(true);
    setTimeout(() => {
      setUploadedTextVisible(false);
    }, 2000);
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
          className={`glass ${isDragActive ? 'highlight' : ''}`}
          style={{ width: '100%', height: '75%', padding: '25px' }}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {
            isDragActive ?
              <p>Drop the files here ...</p> :
              <p>Drag &amp; drop cheque images here</p>
          }
          <p>or</p>
          <form encType="multipart/form-data" onSubmit={handleSubmit} id="uploadForm" method="POST">
            <label htmlFor="fileInput" style={{ cursor: 'pointer' }}>Upload Cheques</label>
            <input
              name="file"
              type="file"
              id="fileInput"
              onChange={handleFileInputChange}
              style={{ display: 'none' }}
              multiple
            />
            {uploadedFiles.map((file, index) => (
              <div key={index}>
                {file.name} - <button type="button" onClick={() => handleRemoveFile(index)}>Remove</button>
              </div>
            ))}
            <br/><br/>
            <button type="submit">Submit</button>
          </form>
          {uploadedTextVisible && <p>Cheque is uploaded</p>}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
