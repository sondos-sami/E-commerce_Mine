import React, { useState } from 'react';
import './CSS/SignupLogin.css';

export const SignupLogin = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    console.log("Login function is working", formData);
    let responseData;
    await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    .then((response) => response.json())
    .then((data) => responseData = data);
  
    if (responseData.success) {
      console.log("Login successful, setting local storage items.");
      localStorage.setItem("auth-token", responseData.token);
      localStorage.setItem("requestingAdminEmail", formData.email); // Set the requesting admin's email to know if he is the main admin or not
  
      console.log("Email set in local storage:", formData.email); 
  
      //Redirection
      if (formData.email === 'admin0@gmail.com' && formData.password === 'admin0') {
        window.location.replace("http://localhost:5175/");
      }
      
      else if (responseData.isAdmin) {
        window.location.replace("http://localhost:5173/");
      }
      else {
        window.location.replace("/home");
      }
    } else {
      alert(responseData.errors);
    }
  };
  
//     console.log("Login function is working", formData);
//     let responseData;

//     await fetch("http://localhost:4000/login", {
//         method: "POST",
//         headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//     })
//     .then((response) => response.json())
//     .then((data) => responseData = data);

//     if (responseData.success) {
//         console.log("Login successful, setting local storage items.");
//         localStorage.setItem("auth-token", responseData.token);
//         localStorage.setItem("requestingAdminEmail", formData.email); // Set the requesting admin's email

//         console.log("Email set in local storage:", formData.email); // Log to verify
//         console.log("Local storage contents:", localStorage); // Log the contents of local storage

//         // Redirect with a delay
//         setTimeout(() => {
//             // Main Admin: Redirect to the full admin panel
//             if (formData.email === 'admin0@gmail.com' && formData.password === 'admin0') {
//                 window.location.replace("http://localhost:5175/");
//             }
//             // Normal Admin: Redirect to admin panel without add/delete admin privileges
//             else if (responseData.isAdmin) {
//                 window.location.replace("http://localhost:5173/");
//             }
//             // Regular User: Redirect to the homepage
//             else {
//                 window.location.replace("/home");
//             }
//         }, 100); // 100ms delay
//     } else {
//         alert(responseData.errors);
//     }
// };

  const signup = async () => {
    console.log("Signup function is working", formData);
    let responseData;
    await fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    .then((response) => response.json())
    .then((data) => responseData = data);

    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/home"); 
    } else {
      alert(responseData.errors);
    }
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>

        <div className="loginsignup-inputsFields">
          {state === "Sign Up" ? <input type='text' name='username' value={formData.username} onChange={changeHandler} placeholder='Write your name' /> : <></>}
          <input type='email' name='email' value={formData.email} onChange={changeHandler} placeholder='Write your email' />
          <input type='password' name='password' value={formData.password} onChange={changeHandler} placeholder='Write your password' />
        </div>

        <button onClick={() => { state === "Login" ? login() : signup() }}>Continue</button>

        {state === "Sign Up" ? <p className='loginsignup-login'>Already have an account? <span onClick={() => { setState("Login") }}>Login Here</span></p>
          : <p className='loginsignup-login'>Create an account? <span onClick={() => { setState("Sign Up") }}>Click Here</span></p>}

        <div className="loginsignup-agree">
          <input type='checkbox' />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}