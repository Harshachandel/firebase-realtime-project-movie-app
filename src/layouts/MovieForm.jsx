// MovieForm.jsx - Netflix-Style Movie Admin Dashboard
import React, { useState, useCallback, useEffect } from "react";
import "../App.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addMovie, getMovie, updateMovie } from "../feature/moiveSlices";
import { useNavigate, useParams } from "react-router-dom";
import { getGenre } from "../feature/genreSlice";

const MovieForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  // const [submitStatus, setSubmitStatus] = useState("idle");

  const { id } = useParams()

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const onSubmit = async (data) => {

    const userId = localStorage.getItem("userId");
    data.userId = userId;  // attach logged-in user ID

    if (id) {
      dispatch(updateMovie({ id, data }))
      alert("Movie Updated Successfully ✅")

    } else {
      dispatch(addMovie(data))
      alert("Movie Added Successfully ✅")

    }
    reset()
    navigate('/moiveView')
  };

  const { movie } = useSelector((state) => state.movie);

  const currentMovie = movie.find((ele) => ele.id == id);

  useEffect(() => {
    dispatch(getMovie());
  }, []);

  useEffect(() => {
    if (currentMovie) {
      reset(currentMovie)
    }
  }, [currentMovie])



  const { gener } = useSelector((state) => state.genre);
  useEffect(() => { dispatch(getGenre()) }, []);


  return (
    <div className="admin-dashboard">
      <div className="dashboard-container">
        <div className="page-header">
          <div className="header-content">
            <div className="header-icon">🎥</div>
            <div>
              <h1 className="page-title">{id ? "Update Movie" : "Add Movie"}</h1>
              <p className="page-subtitle">Add new title to streaming catalog</p>
            </div>
          </div>
          <div className="header-stats">
            <div className="stat-item">
              <span className="stat-number">1,247</span>
              <span className="stat-label">Movies</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">+12%</span>
              <span className="stat-label">This month</span>
            </div>
          </div>
        </div>

        <div className="content-card">
          <form onSubmit={handleSubmit(onSubmit)} className="movie-form">
            <div className="form-section">
              <h3 className="section-title">Movie Details</h3>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    <span className="required">*</span>Title
                  </label>
                  <input
                    id="movie-name"
                    type="text"
                    placeholder="Enter movie title"
                    className={`form-input ${errors.name ? 'error' : ''}`}
                    {...register("name", {
                      required: "Title is required",
                      minLength: { value: 2, message: "At least 2 characters" }
                    })}
                  />
                  {errors.name && <div className="error-text">{errors.name.message}</div>}
                </div>
                <div className="form-group">
                  <label className="form-label">
                    <span className="required">*</span>Genre
                  </label>
                  <select
                    id="movie-genre"
                    className={`form-input ${errors.genre ? 'error' : ''}`}
                    {...register("genre", { required: "Genre is required" })}
                  >
                    <option value="">Select genre</option>

                    {gener.map((item) => (
                      <option key={item.id} value={item.gener}>
                        {item.gener}
                      </option>
                    ))}
                  </select>
                  {errors.genre && <div className="error-text">{errors.genre.message}</div>}
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3 className="section-title">Poster Image</h3>
              <div className="form-group full-width">
                <label className="form-label">
                  <span className="required">*</span>Image URL (TMDB recommended)
                </label>
                <div className="image-input-container">
                  <input
                    id="movie-poster"
                    type="url"
                    placeholder="https://image.tmdb.org/t/p/w500/..."
                    className={`form-input image-input ${errors.movieImg ? 'error' : ''}`}
                    {...register("movieImg", {
                      required: "Poster is required",
                      // pattern: {
                      //   value: /https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|avif)/i,
                      //   message: "Enter valid image URL"
                      // }
                    })}
                  />

                  <div className="image-hint">TMDB format recommended</div>
                </div>
                {errors.movieImg && <div className="error-text">{errors.movieImg.message}</div>}

              </div>
            </div>

            {/* <div className="form-section">
              <h3 className="section-title">Poster Big Image</h3>
              <div className="form-group full-width">
                <label className="form-label">
                  <span className="required">*</span>Image URL (TMDB recommended)
                </label>
                <div className="image-input-container">
                  <input
                    id="movie-poster"
                    type="url"
                    placeholder="https://image.tmdb.org/t/p/w500/..."
                    className={`form-input image-input ${errors.movieImg ? 'error' : ''}`}
                    {...register("movieImg", { 
                      required: "Poster is required",
                      // pattern: {
                      //   value: /https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|avif)/i,
                      //   message: "Enter valid image URL"
                      // }
                    })}
                  />
                  
                  <div className="image-hint">TMDB format recommended</div>
                </div>
                {errors.movieImg && <div className="error-text">{errors.movieImg.message}</div>}
               
              </div>
            </div> */}


            <div className="form-section">
              <h3 className="section-title">Description</h3>
              <div className="form-group full-width">
                <label className="form-label">
                  <span className="required">*</span>Description (Movie Type recommended)
                </label>
                <div className="image-input-container">
                  <textarea
                    id="movie-poster"
                    // type="url"
                    placeholder="description of movie..."
                    className={`form-input image-input ${errors.movieImg ? 'error' : ''}`}
                    {...register("movieDes", {
                      required: "Description is required",
                      // pattern: {
                      //   value: /https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|avif)/i,
                      //   message: "Enter valid image URL"
                      // }
                    })}
                  />

                  <div className="image-hint">Movie Type recommended</div>
                </div>
                {errors.movieImg && <div className="error-text">{errors.movieImg.message}</div>}

              </div>
            </div>


            <div className="form-section">
              <h3 className="section-title">Additional Details</h3>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    <span className="required">*</span>Release Date
                  </label>
                  <input
                    id="release-date"
                    type="date"
                    className={`form-input ${errors.movieDate ? 'error' : ''}`}
                    {...register("movieDate", { required: "Release date is required" })}
                  />
                  {errors.movieDate && <div className="error-text">{errors.movieDate.message}</div>}
                </div>
                <div className="form-group">
                  <label className="form-label">Runtime</label>
                  <input
                    id="movie-runtime"
                    type="number"
                    placeholder="120"
                    min="1"
                    max="600"
                    className="form-input"
                    {...register("runtime")}
                  />
                  <div className="input-helper">Minutes</div>
                </div>
              </div>
            </div>

            <div className="form-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  reset();
                }}
              // disabled={isSubmitting}
              >
                Reset Form
              </button>
              <button
                type="submit"
                // className={`btn btn-primary ${submitStatus}`}
                className={`btn btn-primary`}
              // disabled={isSubmitting}
              >{id ? "Update Movie " : "Add Movie"}
                {/* {isSubmitting && (
                  <span className="btn-loader">
                    <svg viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" pathLength="1" className="loader-path"/>
                    </svg>
                  </span>
                )}
                {submitStatus === "success" ? "Movie Added!" : "Add Movie"} */}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MovieForm;
