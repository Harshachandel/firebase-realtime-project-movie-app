import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MovieForm from './layouts/MovieForm';
import MovieList from './layouts/MovieList';
import MovieSingleView from './layouts/MoiveSingleView';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieCategory from './layouts/MovieCategory';
import MovieNavbar from './layouts/MovieNavbar';
import PrivateRouter from './layouts/PrivateRouter';
import LoginForm from './layouts/loginForm';
import SignUpForm from './layouts/SignUp';



// import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
  return (
    <>
      <Router>
        <MovieNavbar/>
        <Routes>
          

          <Route element={<PrivateRouter/>}>
            
            <Route path='/' element={<MovieForm/>}/>
            <Route path='/:id' element={<MovieForm/>}/>
            <Route path='/moiveView' element={<MovieList/>}/>
            <Route path='/movieSingleView' element={<MovieSingleView/>}/>
            <Route path='/movieSingleView/:id' element={<MovieSingleView/>}/>
            <Route path='/moiveCategory' element={<MovieCategory/>}/>
            
          </Route>

          <Route path='/loginForm' element={<LoginForm/>}/>
          <Route path='/signUp' element={<SignUpForm/>}/>
        </Routes>

      </Router>
      
    </>
  )
}

export default App