# IntelliCTS - Intelligent Cheque Truncation System

IntelliCTS embodies a sophisticated Cheque Truncation System designed to streamline and optimize the clearing process through the integration of state-of-the-art AI/ML/ICR/OCR methodologies. Serving as a robust solution, it seamlessly articulates automatic data entry, meticulous technical verification, precise signature validation, and multilingual assistance, among other capabilities. Through the adept utilization of pioneering technologies, IntelliCTS endeavors to redefine conventional practices within the cheque processing landscape. The system helps to mitigate human intervention, expediting processing timelines and fortifying resilience against potential discrepancies. 

`Videoo:`
[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/YCPpuK4bJfQ/0.jpg)](https://www.youtube.com/watch?v=YCPpuK4bJfQ)

The application facilitates bulk processing of cheques and lets you parse through Account Number, IFSC Code, Amount and handrwitten names in the cheque.

<img src="https://i.imgur.com/n4Fk3NR.jpeg">

<img src="https://i.imgur.com/2W0VCJq.jpeg">

<img src ="https://i.imgur.com/aGKmrmH.jpeg">

## Installation

To install IntelliCTS locally and explore its features, follow these steps:

1. Clone the repository: git clone https://github.com/your-username/IntelliCTS.git
2. Navigate to the project directory: cd IntelliCTS
3. Install dependencies: npm install
4. Start the development server: npm start
5. Access the application in your browser at [http://localhost:3000](http://localhost:3000)

# USP (Unique Selling Propositions)
In the IntelliCTS application, you can expect to find the aforementioned features and manual intervention options, which provide users with enhanced control and flexibility in managing CTS transactions.

## Zero Knowledge Proof System for CTS Transactions

  The Zero Knowledge Proof (ZKP) system enhances security in CTS transactions by allowing parties to prove knowledge of a secret without revealing the secret itself. This ensures that sensitive information remains confidential during transaction verification.

## Blockchain Implementation for Database

  The integration of blockchain technology in the CTS system provides a decentralized and tamper-resistant database for storing transaction records and related information.
  Blockchain ensures transparency, immutability, and traceability of transactions, enhancing trust among stakeholders and reducing the risk of fraud or manipulation.
<img src="https://i.imgur.com/AUjO2dr.jpeg">

The system takes you through a series of steps
- Sign Up
- Sign In
- Edit Profile
- Upload Cheques
- View Cheques and Statuses
- Sign Out

The check clearance system takes you through the following process

<img src="https://i.imgur.com/qWlcrF9.jpeg">

- Initially, the cheque is scanned into the system, converting the physical document into a digital format for processing.
- Once scanned, the cheque undergoes an approval process where its authenticity and validity are verified. If the cheque meets the necessary criteria, it is marked as approved and proceeds to the next stage.
- In this stage, the approved cheque is forwarded to the drawee bank or financial institution, where further processing takes place. This may involve verifying the account details, ensuring sufficient funds, and preparing for clearance.
- After successful processing and clearance by the drawee bank, the cheque status is updated to completed. Funds are transferred from the drawer's account to the payee's account, and the transaction is considered finalized.
- Upon completion, the transaction details are verified to ensure accuracy and integrity. Any discrepancies or errors are addressed, and the transaction status is updated accordingly.
- Finally, the verified transaction is processed by the drawee bank, confirming the successful transfer of funds and completing the cheque processing cycle.

### Dashboard.js

*Cheque Management:*
- Upload Cheque Images: Allows users to upload images of cheques for processing.
- Input Handling: Supports both drag-and-drop and file selection methods for uploading images.
- Submission and Confirmation: Provides a submission button for uploading cheques and displays a confirmation message upon successful submission.
- Explore Features: Includes navigation links to other sections of the application for further exploration.

### Login.js

*User Authentication:*
- Login Form: Presents a simple form for users to enter their credentials securely.
- Authentication Process: Handles user authentication by sending entered credentials to the server for verification.
- Session Management: Stores session key in the session storage upon successful login, enabling secure access to features.
- Seamless Navigation: Redirects users to the dashboard page upon successful authentication, providing a smooth user experience.

### Logout.js

*Session Control:*
- Clear Session: Clears the session storage upon component mount, effectively logging the user out.
- Secure Logout: Ensures user sessions are terminated securely to prevent unauthorized access.
- No UI Interaction: Performs logout action without rendering any visible UI elements, maintaining simplicity and efficiency.

### Lookup.js

*Cheque Status Lookup:*
- Status Inquiry: Allows users to enter cheque details (cheque number, IFSC, MICR) to check the status of cheques.
- API Interaction: Sends a POST request to the server endpoint for status lookup, ensuring accurate information retrieval.
- Display Status: Presents the status of the cheque obtained from the server response, providing users with real-time updates.
- Process Diagram: Includes a visual aid explaining abbreviations used in the process, enhancing user understanding.

### Profile.js

*Profile Settings:*
- Update Profile Information: Enables users to modify their profile details, such as email and institution type.
- Input Handling: Provides input fields for easy entry of profile information, ensuring user convenience.
- Submission: Allows users to submit changes with an update button, facilitating smooth profile management.
- Navigation Links: Offers navigation links for accessing other application sections like cheque uploading, status lookup, and logout.

### App.js

*Routing Configuration:*
- Setup Routing: Defines routes for different sections of the application using React Router, ensuring proper navigation.
- Default Route: Directs users to the login page when they visit the application root, enhancing user flow.
- Component Rendering: Renders respective components based on URL paths specified in the routes, providing dynamic content display.
- Styling Integration: Applies styles to the application using the provided styles.css file, ensuring a consistent and visually appealing UI.

<img src="https://i.imgur.com/ov0rdKZ.jpeg">
<img src="https://i.imgur.com/wJ4L3Wo.jpeg">
<img src="https://i.imgur.com/AiiGbJK.jpeg">
<img src="https://i.imgur.com/XOIcCUv.jpeg">

# Backend for IntelliCTS - Check Truncation System: Features Description

## User Management:
- *Create Account:* Users can easily create a new account by providing their details. This feature ensures that users can access the system securely.

- *View Account Details:* Users can view their account details, including personal information and settings, to stay informed about their account status.

- *Update Account Information:* Users have the flexibility to update their account information as needed, ensuring their details are always up to date.

- *Delete Account:* Users can delete their account if they no longer wish to use the system, providing a seamless way to manage their account lifecycle.

## Authentication and Authorization:
- *User Login:* Secure user authentication ensures that only authorized users can access the system. Users can log in using their credentials to access the system's features and functionalities.

- *User Logout:* Logging out of the system ensures the security of user accounts by terminating active sessions. Users can log out to end their current session and protect their account from unauthorized access.

## Cheque Processing:
- *Upload Cheques:* Users can easily upload cheque details to the system for processing. This feature streamlines the cheque processing workflow and ensures accurate record-keeping.

- *Check Cheque Status:* Users can check the status of their uploaded cheques to track their processing status. This feature provides transparency and visibility into the cheque processing pipeline.

- *Update Cheque Status:* Users have the ability to update the status of cheques as they progress through the processing pipeline. This feature enables efficient management and tracking of cheque processing tasks.

## Blockchain Integration:
- *View Blockchain Blocks:* Users can view details of individual blocks within the blockchain, providing transparency and auditability of transactions stored on the blockchain.

- *View Latest Block:* Users can easily access information about the latest block added to the blockchain, ensuring they stay up to date with the most recent transactions.

- *Add New Block:* Authorized users can add new blocks to the blockchain, facilitating the secure and immutable recording of transactions. This feature ensures the integrity and security of the blockchain network.

## File Structure

Node-Code
│
├── controllers
│ ├── authController.js
│ ├── userController.js
│ └── checkController.js
│
├── ml_modules
│ └── signature_ident_data
│ ├── x
│ │ └── [cheque images in folder x]
│ └── y
│ └── [cheque images in folder y]
│
├── routes
│ ├── ChequeRouter.js
│ └── UserRouter.js
│
├── index.js
├── package-lock.json
├── package.json
├── postgresql-dump-intelliCTS.sql
└── swagger.json

## Screenshots
<img src='https://i.imgur.com/htWkoyy.jpeg'>
<img src='https://i.imgur.com/l6GUjcr.jpeg'>
