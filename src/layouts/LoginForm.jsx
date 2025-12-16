// Login.jsx
import React from "react";
import "./LoginPage.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {auth} from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {

  const {register , handleSubmit , reset} = useForm()

  const redirect = useNavigate()

  function LogInFun(data){

    signInWithEmailAndPassword(auth,data.email,data.password ).then((res)=>{
      console.log("res",res)

      const uid = res?.user?.uid;

      // ⚠️ Check if userId exists or not
      if (!uid) {
        alert("User ID does not exist! Something went wrong ❌");
        return; // Stop execution
      }

      alert("LogIn Successfully ✅")
        localStorage.setItem('userId',res.user.uid) 
      reset();
      redirect('/moiveView')
    }).catch((err)=>{
      alert(err)
      
    })

  }


  return (

    <div className="home-page auth-page">
      <div className="home-bg-gradient" />

      {/* Navbar (optional, same as before) */}
    

      {/* Centered login card */}
      <main id="login" className="auth-wrapper">
        <div className="auth-card">
          <div className="auth-header">
            <p className="home-pill auth-pill">Welcome back</p>
            <h1>Log-in to your account</h1>
            {/* <p className="auth-sub">
              Access your dashboard, manage projects, and continue building
              premium UIs.
            </p> */}
          </div>

          <form className="auth-form" onSubmit={handleSubmit(LogInFun)}>
            <div className="auth-field">
              <label htmlFor="email">Email address</label>
              <div className="auth-input-wrap">
                <input
                  {...register('email')}
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="password">Password</label>
              <div className="auth-input-wrap">
                <input
                  {...register('password')}
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {/* <div className="auth-row">
              <label className="auth-checkbox">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <button type="button" className="auth-link">
                Forgot password?
              </button>
            </div> */}

            <button type="submit" className="home-btn-primary auth-submit">
              Sign in
            </button>

            <div className="auth-divider">
              <span />
              <p>or continue with</p>
              <span />
            </div>

            {/* <div className="auth-social-row">
              <button type="button" className="auth-social-btn">
                Google
              </button>
              <button type="button" className="auth-social-btn">
                GitHub
              </button>
            </div> */}

            <p className="auth-footer-text">
              Don&apos;t have an account?{" "}
              <NavLink to='/signUp' type="button" className="auth-link">
                Sign-Up
              </NavLink>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;
