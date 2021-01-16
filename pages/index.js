import React, { useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";

const index = () => {
  const [movies, setMovies] = useState(null);

  const createMovies = async () => {
    // setMovies(null);
    // const { data } = await axios.get(`/api/create`);
    // setMovies(data);
  };

  const readMovies = async () => {
    // setMovies(null);
    // const { data } = await axios.get(`/api/get`);
    // setMovies(data);
  };

  return (
    <Layout title="Shikuesi - Home">
      <div>
        <button onClick={createMovies}>Create Movies</button>
        <button onClick={readMovies}>Read Movies</button>

        <ul>
          {movies &&
            movies.map((movie, index) => {
              const { title } = movie;
              return <li key={index}>{title}</li>;
            })}
        </ul>
      </div>
    </Layout>
  );
};

export default index;
