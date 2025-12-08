import React, { useEffect, useState } from "react";
import "../Row/Row.css";
import axiosInstance from "../../../utils/axios";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);

  const base_pic = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    (async () => {
      try {
        const request = await axiosInstance.get(fetchUrl);
        setMovies(request.data.results);
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [fetchUrl]);

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row_posters">
        {movies?.map((movie) => (
          <img
            key={movie.id}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${base_pic}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.title || movie.name}
          />
        ))}
      </div>
    </div>
  );
};

export default Row;








// import React, { useEffect, useState } from "react";
// import Request from "../../../utils/requests";
// import "../Row/Row.css";
// import axiosinstance from "../../../utils/axios";
// // import movieTrailer from "movie-trailer";
// // import YouTube from "react-youtube";

// const Row = ({ title, fetchUrl, isLargeRow }) => {
//   const [movies, setMovies] = useState([]);
//   // const [trailerurl, setTrailerurl] = useState("");

//   const base_pic = "https://image.tmdb.org/t/p/original/";

//   useEffect(() => {
//     (async () => {
//       try {
//         console.log(fetchUrl);
//         const request = await axiosinstance.get(`http://localhost:3000/api/${fetchUrl}`);
//         console.log(Request);
//         setMovies(request.data.results);
//       } catch (error) {
//         console.log("error", error);
//       }
//     })();
//   }, [fetchUrl]);
//   return (
//     <div className="row">
//       <h2>{title}</h2>
//       <div className="row_posters">
//         {movies.map((movie) => (
//           <img
//             key={movie.id}
//             className={`row_poster ${isLargeRow && "row_posterLarge"}`}
//             src={`${base_pic}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
//             alt={movie.name}
//           />
//         ))}
//       </div>
//     </div>
//   );
// // const handleClick = (movie) => {
// //   if (trailerurl) {
// //     setTrailerurl("");
// //   } else {
// //     movieTrailer(movie?.title || movie?.original_name)
// //       .then((url) => {
// //         const urlParams = new URLSearchParams(new URL(url).search);
// //         setTrailerurl(urlParams.get("v"));
// //       })
// //       .catch((error) => console.log(error));

// //   }
// // };
// };

// export default Row
