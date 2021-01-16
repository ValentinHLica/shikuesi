import React from "react";
import getFeatured from "../utils/featured";

const Test = ({ data }) => {
  // console.log(data);

  return (
    <ul>
      {data &&
        data.map((movie, index) => {
          if (movie) {
            const {
              id,
              imdb,
              title,
              backgroundImage,
              rating,
              genres,
              summary,
            } = movie;

            return (
              <li key={index}>
                <img src={backgroundImage} alt={title} />
              </li>
            );
          }
          return null;
        })}
    </ul>
  );
};

export const getServerSideProps = async () => {
  const data = await getFeatured();

  return {
    props: {
      data,
    },
  };
};

export default Test;
