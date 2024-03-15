import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {

  const navigate = useNavigate();

  useEffect(() => {
    // Check session variable when component mounts
    sessionStorage.clear();
    navigate('/')
    
  }, [navigate]);

};

export default Logout;