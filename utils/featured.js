import axios from "axios";
import cheerio from "cheerio";

/**
 * Scrape YTS Featured Movies Titles
 */
const scrapeFeatured = async () => {
  const pageLimit = 5;
  const pageNumber = Math.ceil(Math.random() * pageLimit);

  const url = `https://yts.mx/browse-movies/0/all/all/0/featured/0/all?page=${pageNumber}`;
  const movies = [];

  console.log(pageNumber);

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    $(
      ".main-content .browse-content .container > section .browse-movie-wrap"
    ).each((index, element) => {
      const title = $(element).find(".browse-movie-title").text().trim();

      if (title.includes("]")) {
        movies.push(title.split("]")[1].trim());
        return;
      }

      movies.push(title.trim());
    });

    return {
      success: true,
      movies,
    };
  } catch (err) {
    console.log("Failed to scrape yts");

    // console.log(err);
    return {
      success: false,
    };
  }
};

/**
 * Scrape Movie Background Image
 */
const scrapeBackground = async (imdb) => {
  const url = `https://www.2embed.ru/embed/imdb/movie?id=${imdb}`;

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const backgroundImage = $("#content-loading img").attr("src");

    return backgroundImage;
  } catch (err) {
    console.log("Failed to get background Image");
    return {
      success: false,
      message: "Failed to get background Image",
    };
  }
};

/**
 * Fetch YTS API and get the IMDB ID and other Information
 */
const fetchApi = async (query) => {
  const pageNumber = 1;
  const limit = 1;
  const quality = "all";
  const rating = 0;
  const genre = "all";
  const sort = "year";

  const url = `https://yts.mx/api/v2/list_movies.json?page=${pageNumber}&quality=${quality}&limit=${limit}&minimum_rating=${rating}&query_term=${query}&genre=${genre}&sort_by=${sort}`;

  try {
    const { data } = await axios.get(url);

    if (!data.data.movies[0]) {
      console.log("Could not fetch Movie", 1);
      return {
        success: false,
        message: "Could not fetch Movie",
      };
    }

    const {
      imdb_code,
      title,
      rating,
      genres,
      summary,
      id,
    } = data.data.movies[0];

    const backgroundImage = await scrapeBackground(imdb_code);

    if (!backgroundImage || backgroundImage.includes("null")) {
      console.log("Could not fetch Movie", 2);
      return {
        success: false,
        message: "Could not fetch Movie",
      };
    }

    const filteredMovie = {
      id,
      imdb: imdb_code,
      title,
      backgroundImage,
      rating,
      genres,
      summary,
    };

    return filteredMovie;
  } catch (err) {
    console.log("Could not fetch Movie", 3);
    return {
      success: false,
      message: "Could not fetch Movie",
    };
  }
};

/**
 * Run Script
 */
export default async () => {
  const { success, movies } = await scrapeFeatured();

  if (success) {
    return Promise.all(
      movies.map(async (movie) => {
        const item = await fetchApi(movie);

        if (item.id) {
          return item;
        }

        return null;
      })
    );
  }
};
