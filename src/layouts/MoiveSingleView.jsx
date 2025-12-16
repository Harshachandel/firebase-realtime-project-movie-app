import React, { useEffect } from 'react';

import '../App.css'
import { useDispatch, useSelector } from 'react-redux';
import { getMovie } from '../feature/moiveSlices';
import { useParams } from 'react-router-dom';

const MovieSingleView = () => {

  
  const {movie} = useSelector(state=>state.movie)
  const {id} = useParams()

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getMovie())
  },[dispatch])

  const filterData = movie.find((ele)=> ele.id === id)
  console.log("filterData",filterData)

  // Sample detailed movie data (for demonstration)
  const movies = {
    id: 4,
    title: "The Dark Knight",
    tagline: "Why so serious?",
    synopsis: "Following the events of Batman Begins, Batman, Lieutenant James Gordon, and District Attorney Harvey Dent successfully begin to round up the criminals that plague Gotham City, until a mysterious and sadistic criminal mastermind known only as The Joker appears in Gotham, creating a new wave of chaos.",
    genre: "Action, Crime, Drama",
    poster: "https://static.toiimg.com/thumb/msid-122088187,width-1280,height-720,resizemode-4/122088187.jpg", // High res poster for hero
    // poster: "https://www.hindustantimes.com/ht-img/img/2024/09/19/1600x900/Stree_2_1726740967677_1726740967852.jpg", // High res poster for hero
    // poster: "https://assets.gqindia.com/photos/66fba682bc6ca5465b801999/16:9/w_1920,h_1080,c_limit/Stree-2.jpg", // High res poster for hero
    releaseDate: "2008-07-18",
    runtime: 152,
    rating: 9.0,
    director: "Christopher Nolan",
    cast: [
      { name: "Christian Bale", role: "Bruce Wayne / Batman" },
      { name: "Heath Ledger", role: "The Joker" },
      { name: "Aaron Eckhart", role: "Harvey Dent / Two-Face" },
      { name: "Michael Caine", role: "Alfred Pennyworth" },
    ],
    awards: "Won 2 Oscars. Another 161 wins & 163 nominations."
  };

  const releaseYear = new Date(movies.releaseDate).getFullYear();

  // Utility to format runtime from minutes to Hh Mmin
  const formatRuntime = (minutes) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}min`;
  };
  
  // const ele = movie.find((m) => m.id === parseInt(id)) || movie[0];

  return (

  
      

           <div className="single-movie-page">
             {/* 1. Hero Banner Section */}
                <section 
                  className="movie-hero"
                  style={{ backgroundImage: `url("https://static.toiimg.com/thumb/msid-122088187,width-1280,height-720,resizemode-4/122088187.jpg")` }}
                >
          <div className="hero-content-wrapper">
            <div className="hero-details">
              <h1 className="hero-title">War 2 </h1>
              {/* <h1 className="hero-title">{ele.name}War 2 </h1> */}
              {/* <p className="hero-tagline">{movies.tagline}</p> */}
            
              {/* Meta Info */}
              <div className="hero-meta">
                <span className="meta-item rating-star">
                  {/* <i className="fas fa-star"></i> {movies.rating} / 10 */}
                </span>
                {/* <span className="meta-item runtime">{formatRuntime(ele.runtime)}</span> */}
                {/* <span className="meta-item runtime">{ele.runtime}</span> */}
                <span className="meta-item year">{movies.movieDate}</span>
              </div>
            
            {/* Actions */}
                <div className="hero-actions">
                  <button className="primary-btn">
                    <i className="fas fa-play"></i> Watch Trailer
                  </button>
                  <button className="secondary-btn">
                    <i className="fas fa-plus"></i> Add to Watchlist
                  </button>
                </div>
              </div>
            </div>
          </section>

      {/* 2. Main Details Section */}
      <div className="details-container">
        <div className="main-content-area">
          {/* Synopsis */}
          <div className="synopsis-block">
            <h2 className="section-heading">Synopsis</h2>
            <p className="synopsis-text">{movies.synopsis}</p>
            <div className="genre-badges">
              {/* {movies.genre.split(',').map(g => (
                <span key={g} className="genre-tag">{g.trim()}</span>
              ))} */}
            </div>
          </div>


      </div>
    

         

        {/* Sidebar/Secondary Info */}
        <div className="sidebar-area">
          {/* Director Card */}
          <div className="info-card director-card">
            <h3 className="card-heading">Director</h3>
            <p className="card-detail">{movies.director}</p>
          </div>

          {/* Cast */}
          <div className="info-card cast-card">
            <h3 className="card-heading">Top Cast</h3>
            <ul className="cast-list">
              {movies.cast.map((member, index) => (
                <li key={index} className="cast-item">
                  <span className="cast-name">{member.name}</span>
                  <span className="cast-role">{member.role}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    
     {/* Awards and Achievements */}
          <div className="awards-block">
            <h2 className="section-heading">Awards</h2>
            <p className="awards-text">
              <i className="fas fa-trophy"></i> {movies.awards}
            </p>
          </div>
        </div>
  );
};

export default MovieSingleView;