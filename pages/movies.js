import React from "react";
// import getMovies from "../utils/get";

const Movies = ({ env }) => {
  return (
    <ul>
      <li>{env}</li>

      {/* {data &&
        data.map((movie, index) => {
          const { title } = movie;
          return <li key={index}>{title}</li>;
        })} */}
    </ul>
  );
};

export const getServerSideProps = async () => {
  //   const data = await getMovies();
  const env = process.env.PROJECT_ID;

  return {
    props: {
      //   data,
      env,
    },
  };
};

export default Movies;
