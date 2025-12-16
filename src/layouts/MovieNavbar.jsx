import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../App.css";
import {auth} from "../firebase";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";

const MovieNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const [isAuth, setIsAuth] = useState(null)

  const redirect = useNavigate()

  


  const signUp = () =>{
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth,provider).then((res)=>{
      console.log("Successfully Login ✅")
      console.log(res)
      console.log(auth)
      localStorage.setItem("userId", res.user.uid);
      redirect('/moiveView')
    }).catch((err)=>{
      console.log(err)
    })
  }

  ///////

  function getAuthfun(){
    onAuthStateChanged(auth,(user)=>{
      setIsAuth(user)
      console.log(user)
    })
  }

  useEffect(()=>{
    getAuthfun()
  },[auth])


  ////////Logout 

  function logOut(){
    signOut(auth).then(()=>{
      localStorage.removeItem("userId");
      alert("You Log-Out ")
    }).catch((err)=>{
      console.log("Error is in Logout : ",err)
    })
  }

  return (
    <nav className="movie-navbar">
      <div className="nav-container">
        <h2 className="nav-logo">🎬 MovieHub</h2>

        <div
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>

  {/* ⭐ USER NOT LOGGED IN = ONLY GOOGLE SIGNUP */}
  {!isAuth && (
    <li>
      <a onClick={signUp}>Sign Up with Google</a>
    </li>
  )}

  {/* ⭐ USER LOGGED IN = SHOW ALL LINKS */}
  {isAuth && (
    <>
      <li>
        <NavLink to="/" onClick={() => setMenuOpen(false)}>Add Movie</NavLink>
      </li>

      <li>
        <NavLink to="/moiveView" onClick={() => setMenuOpen(false)}>Movie List</NavLink>
      </li>

      <li>
        <NavLink to="/moiveCategory" onClick={() => setMenuOpen(false)}>Genre Category</NavLink>
      </li>

      <li>
        <NavLink to="/movieSingleView" onClick={() => setMenuOpen(false)}>Single View</NavLink>
      </li>

      <li>
        <a onClick={logOut}>Log-out</a>
      </li>
    </>
  )}

</ul>



        {/* <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => setMenuOpen(false)}
            >
              Add Movie
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/moiveView"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => setMenuOpen(false)}
            >
              Movie List
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/moiveCategory"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => setMenuOpen(false)}
            >
              Genre Category
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/movieSingleView"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => setMenuOpen(false)}
            >
              Single View
            </NavLink>
          </li>
          <li>
            {
              
              isAuth == null ?

              <a
              // to="/movieSingleViewn"
              // className={({ isActive }) => (isActive ? "active" : "")}
              // onClick={() => setMenuOpen(false)}
              onClick={signUp}>
              Sign Up with Google
            </a>

            : 

            <a onClick={logOut}>
              Log-out
            </a>

            }
          </li>
        </ul> */}
      </div>
    </nav>
  );
};

export default MovieNavbar;
