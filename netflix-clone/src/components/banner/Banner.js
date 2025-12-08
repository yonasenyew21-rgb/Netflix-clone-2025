import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";
import requests from "../../utils/requests";
import "./Banner.css";

const Banner = () => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        // request to TMDB using our axios instance
        const response = await axiosInstance.get(requests.fetchNetflixOriginals);

        const results = response.data?.results ?? [];

        if (results.length > 0) {
          const randomIndex = Math.floor(Math.random() * results.length);
          setMovie(results[randomIndex]);
        }
      } catch (err) {
        console.error("Error fetching banner movie:", err);
      }
    };

    fetchBanner();
  }, []);

  // Log movie when updated
  useEffect(() => {
    if (movie) {
      // console.log("Banner Loaded:", movie);
    }
  }, [movie]);

  if (!movie) return null;

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__content">
        <h1 className="banner__title">
          {movie.title || movie.name || movie.original_name}
        </h1>

        <p className="banner__description">
          {movie.overview?.length > 200
            ? movie.overview.substring(0, 200) + "..."
            : movie.overview}
        </p>
      </div>

      <div className="banner__fadeBottom"></div>
    </header>
  );
};

export default Banner;



// import React from "react";
// import axios from "../../utils/axios";
// import requests from "../../utils/requests";
// import { useEffect, useState } from "react";
// import "./Banner.css";

// const Banner = () => {
//   const [movie, setMovie] = useState(null);
//   useEffect(() => {
//     const fetchBanner = async () => {
//       const response = await axios.get(requests.fetchNetflixOriginals);
//       const results = response.data.results;
//       setMovie(results[Math.floor(Math.random() * results.length)]);
//     };
//     fetchBanner();
//    // console.log(movie);
//   }, []);

//   return movie ? (
//     <header
//       className="banner"
//       style={{
//         backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
//       }}
//     >
//       <div className="banner__content">
//         <h1 className="banner__title">
//           {movie.title || movie.name || movie.original_name}
//         </h1>
//         <p className="banner__description">{movie.overview}</p>
//       </div>
//       <div className="banner__fadeBottom"></div>
//     </header>
//   ) : null;
// };

// export default Banner;
