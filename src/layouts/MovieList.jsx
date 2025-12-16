// MovieList.jsx - Modern, Mature & Responsive Movie Catalog UI
import React, { useEffect, useState } from "react";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteMovie, getMovie } from "../feature/moiveSlices";
import { BiEditAlt, BiTrash } from "react-icons/bi";
import { Navigate, NavLink, useNavigate } from "react-router-dom";

const MovieList = () => {
  // Sample movie data (replace with your API data)

  const { movie } = useSelector(state => state.movie)
  console.log("moive", movie)

  const navigate = useNavigate()

  const dispatch = useDispatch()

    const userId = localStorage.getItem("userId"); // 🔥 who is logged in

  useEffect(() => {
    dispatch(getMovie())
  }, [])

  function deletefun(id) {
    if (confirm("do you want to delete this movie ??")) {
      dispatch(deleteMovie(id))
      alert("Deleted movie Successfully")
    }
  }

   const filteredMovies = movie.filter((m) => m.userId === userId); // 🔥 ONLY user's movies

  const [movies] = useState([
    {
      id: 1,
      title: "Inception",
      genre: "Sci-Fi",
      poster: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
      releaseDate: "2010-07-16",
      runtime: 148,
      rating: 8.8
    },
    {
      id: 2,
      title: "The Matrix",
      genre: "Action",
      poster: "https://image.tmdb.org/t/p/w500/gxu8Mp9H2LaHh3yKxgYc6u3QT2X.jpg",
      releaseDate: "1999-03-31",
      runtime: 136,
      rating: 8.7
    },
    {
      id: 3,
      title: "Interstellar",
      genre: "Sci-Fi",
      poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      releaseDate: "2014-11-07",
      runtime: 169,
      rating: 8.6
    },
    {
      id: 4,
      title: "The Dark Knight",
      genre: "Action",
      poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      releaseDate: "2008-07-18",
      runtime: 152,
      rating: 9.0
    },
    {
      id: 5,
      title: "Oppenheimer",
      genre: "Drama",
      poster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
      releaseDate: "2023-07-21",
      runtime: 180,
      rating: 8.4
    },
    {
      id: 6,
      title: "Dune",
      genre: "Sci-Fi",
      poster: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPciJZt58tl.jpg",
      releaseDate: "2021-10-22",
      runtime: 155,
      rating: 7.8
    },
    {
      id: 7,
      title: "Dune",
      genre: "Sci-Fi",
      poster: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPciJZt58tl.jpg",
      releaseDate: "2021-10-22",
      runtime: 155,
      rating: 7.8
    }
  ]);

  // Example for a Featured Movie section (using a high-rated one)
  const featuredMovie = movies.find(m => m.id === 4);

  return (
    <div className="movie-dashboard">
      <header className="dashboard-header">
        <h1 className="header-title">Movie Catalog 🍿</h1>
        <p className="header-subtitle">Your comprehensive library of cinematic releases.</p>
        <div className="header-stats-bar">
          <div className="stat-item">
            <span className="stat-value">{movies.length}</span>
            <span className="stat-label">Total Movies</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{movies.filter(m => m.rating >= 8.5).length}</span>
            <span className="stat-label">Highly Rated</span>
          </div>
          <NavLink to={'/'} className="add-movie-btn link-underline-none">+ Add New Movie</NavLink>
        </div>
      </header>

      {/* Featured Movie Section - A more mature design often prioritizes content */}
      {featuredMovie && (
        <section className="featured-section">
          <div className="featured-backdrop" style={{ backgroundImage: `url(${featuredMovie.poster})` }}></div>
          <div className="featured-content">
            <span className="section-title">FEATURED TODAY</span>
            <h2 className="featured-title">{featuredMovie.title}</h2>
            <div className="featured-meta">
              <span className="meta-badge genre">{featuredMovie.genre}</span>
              <span className="meta-badge rating">⭐ {featuredMovie.rating}</span>
              <span className="meta-info">{new Date(featuredMovie.releaseDate).getFullYear()}</span>
              <span className="meta-info">{featuredMovie.runtime} min</span>
            </div>
            <div className="featured-actions">
              <NavLink to={'/movieSingleView'} className="primary-action-btn">▶ Watch Now</NavLink>
              <button className="secondary-action-btn">More Info</button>
            </div>
          </div>
        </section>
      )}

      <main className="movie-list-section">
        <h3 className="section-title">All Catalog Items</h3>

        {filteredMovies.length > 0 ? (
          <div className="movies-grid">
            {filteredMovies.map((ele) => (
              <div key={ele.id} className="movie-card">
                <div className="card-poster-wrapper">
                  <img
                    src={ele.movieImg}
                    alt={ele.name}
                    loading="lazy"
                  />
                  <div className="rating-pill"> {ele.runtime}</div>
                  <div className="card-overlay">
                    <div className="card-actions">
                      <NavLink to={`/movieSingleView/${ele.id}`} className="action-btn play" aria-label="Play" >
                        ▶
                      </NavLink>
                    </div>
                  </div>
                </div>
                <div className="card-info">
                  {/* <h4 className="card-title pb-2">{ele.name}</h4> */}
                  {/* <button className="btn bg-danger">nbnjh</button> */}
                  {/* <div className="btn-group">
                    <button className="btn btn-outline-danger w-100 h-25 mb-2"  ><BiTrash/></button>
                    <button className="btn btn-outline-info w-100 h-25 mb-2"><BiEditAlt/></button>
                  </div> */}
                  <div className="card-action-btns mb-2">
                    <h4 className="card-title ">{ele.name}</h4>

                    <button className="movie-btn edit" onClick={() => navigate(`/${ele.id}`)} type="button" aria-label="Edit movie">
                      <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                      </svg>
                    </button>
                    <button className="movie-btn delete" onClick={() => deletefun(ele.id)} type="button" aria-label="Delete movie">
                      <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>







                  <p className="card-meta-detail">{new Date(ele.movieDate).getFullYear()} • {ele.genre}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">🎬</div>
            <h2>No movies found</h2>
            <p>Add your first movie using the "Add New Movie" button.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default MovieList;