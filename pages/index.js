import React from "react";
import getMovies from "../utils/get";

const Movies = ({ data }) => {
  return (
    <ul>
      {data &&
        data.map((movie, index) => {
          const { title } = movie;
          return <li key={index}>{title}</li>;
        })}
    </ul>
  );
};

export const getServerSideProps = async () => {
  const data = await getMovies();

  return {
    props: {
      data,
    },
  };
};

export default Movies;
