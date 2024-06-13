import React from "react";
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


function Header() {
  const token = localStorage.getItem('token');
let decodedToken
        if (token) {
            // Decode the token to get user information
             decodedToken = jwtDecode(token);
            console.log(decodedToken.student.name)
           // setname(decodedToken.student.name)
        }
  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px'
    }}>
      <h1 style={{ margin: 0 }}>TO DO</h1>
      <div style={{ display: 'flex', gap: '10px' }}>
      <h1>{`Hi ${decodedToken.student.name}!`}</h1>
        <Link to="/">
          <button 
            style={{
             
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
          >
            Sign In
          </button>
        </Link>
        <Link to="/signup">
          <button 
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
          >
            Sign Up
          </button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
