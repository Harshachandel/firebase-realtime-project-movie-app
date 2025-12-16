import React, { useEffect, useState } from 'react';
import './MovieCategory.css';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import { addGenre, getGenre, deleteGenre, updateGenre } from "../feature/genreSlice";

const MovieCategory = () => {

  const { register, handleSubmit, reset, setValue } = useForm();
  const dispatch = useDispatch();

  const { gener } = useSelector((state) => state.genre);

  console.log("gener",gener)
  const [editId, setEditId] = useState(null);

  // const userId = localStorage.getItem("userId"); // 🔥 get logged user

  useEffect(() => {
    dispatch(getGenre());
  }, [dispatch]);

    // const filteredGenre = gener.filter((g) => g.userId === userId); // 🔥 only this user's

  function onSubmit(data) {

    // If EDIT Mode
    if (editId) {
      const exists = gener.some(
        (ele) =>
          ele.gener.toLowerCase() === data.gener.toLowerCase() &&
          ele.id !== editId
      );

      if (exists) {
        alert("Category already exists ❌");
        return;
      }

      dispatch(updateGenre({ id: editId, data }));
      alert("Category Updated Successfully ✅");

      reset();
      setEditId(null);
      return;
    }

    // If ADD Mode
    const exists = gener.some(
      (ele) => ele.gener.toLowerCase() === data.gener.toLowerCase()
    );

    if (exists) {
      alert("Category already exists ❌");
      return;
    }

    dispatch(addGenre(data));
    console.log(data)
    alert("Category Added Successfully ✅");
    reset();
  }

  // EDIT Function
  function handleEdit(item) {
    setEditId(item.id);
    setValue("gener", item.gener); // Fill input box
  }

  return (
    <>
      <section className="movie-category-section mx-auto my-5 ">
        <header className="category-header">
          <h1>Movie Categories</h1>

          <form className="category-form" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              {...register("gener")}
              placeholder="Add new category"
              required
              className="category-input"
            />

            <button type="submit" className="btn-add">
              {editId ? "Update" : "Add"}
            </button>
          </form>
        </header>

        <main>
          <table className="category-table">
            <thead>
              <tr>
                <th>Category Name</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {gener.map((item) => (
                <tr key={item.id} className="category-row">
                  <td>{item.gener}</td>
                  <td className="actions-cell">

                    {/* EDIT */}
                    <button
                      className="icon-btn edit-btn"
                      onClick={() => handleEdit(item)}
                    >
                      ✎
                    </button>

                    {/* DELETE */}
                    <button
                      className="icon-btn delete-btn"
                      onClick={() => dispatch(deleteGenre(item.id))}
                    >
                      🗑
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </main>
      </section>
    </>
  );
};

export default MovieCategory;
