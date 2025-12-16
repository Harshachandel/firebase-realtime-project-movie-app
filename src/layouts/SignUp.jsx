// LoginForm.jsx
import React from "react";
import "../App.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebase";

const SignUpForm = () => {

    const {register , handleSubmit , reset} = useForm()

    const redirect = useNavigate()

    function Signup(data){

        createUserWithEmailAndPassword(auth,data.email,data.password).then((res)=>{
            console.log(res);
            alert("Sign Up Successfully ✅")
            reset();
            redirect('/loginForm');
        }).catch((err)=>{
            alert(err)
        })

    }

  return (
    <div className="auth-container">
      <div className="auth-card-sign-up">
        <h3 className="auth-title">SignUp 🎬</h3>

        <form className="auth-form" onSubmit={handleSubmit(Signup)}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" {...register('email')} placeholder="Enter your email" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" {...register('password')} placeholder="Enter your password" />
          </div>

          <button type="submit" className="auth-btn primary">
            Sign Up
          </button>

          <div className="divider">OR</div>

          {/* <button type="button" className="auth-btn google-btn">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
            />
            Sign in with Google
          </button> */}
        </form>

        <p className="switch-text">
          Don’t have an account? <NavLink to='/loginForm' className="link-text">Log In</NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
