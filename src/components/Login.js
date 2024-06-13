import { useState, React } from 'react';
import './Login.css';
import SideImg from "../images/login.png";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Footer from '../components/Footer';

const Login = (props) => {

  let navigate = useNavigate();
  const [loginCredentials, setLoginCredentials] = useState({ name:"",email: "", password: "" });

  const onChange = (e) => {
    setLoginCredentials({ ...loginCredentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5500/api/v1/notes/loginuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({name:loginCredentials.name, email: loginCredentials.email, password: loginCredentials.password })
      });
      const json = await response.json();
      if (json.authToken) {
        localStorage.setItem('token', json.authToken);
        navigate("/tasks");
        toast.success("Logged In Successfully");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
        <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', maxWidth: '400px', width: '100%' }}>
          <h1 style={{ marginBottom: '20px', textAlign: 'center', color: '#333' }}>Log In</h1>
          <input
            type='text'
            placeholder='Name'
            value={loginCredentials.name}
            onChange={onChange}
            name='name'
            style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ddd' }}
          />
          <input
            type='email'
            placeholder='Email'
            value={loginCredentials.email}
            onChange={onChange}
            name='email'
            style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ddd' }}
          />
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={loginCredentials.password}
            onChange={onChange}
            style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ddd' }}
          />
          <button type='submit' style={{ width: '80%', padding: '10px', borderRadius: '5px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer',top:"280px",left:"40px" }}>
            Submit
          </button>
        </form>
        <div style={{ marginLeft: '50px' }}>
          <img src={SideImg} alt="Login" style={{ width: '400px', height: '400px', objectFit: 'cover', borderRadius: '8px' }} />
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Login;
