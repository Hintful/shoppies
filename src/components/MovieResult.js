import React, { useEffect, useState } from 'react';
import { NOMINATE_LIMIT } from '../constants/Constants';

const MovieResult = ({ nominated, setNominated, movie }) => {
  const [currentlyNominated, setCurrentlyNominated] = useState(() => isNominated(movie));

  function isNominated(movie) {
    return nominated.find(({ imdbID }) => imdbID === movie.imdbID) !== undefined;
  }

  useEffect(() => {
    setCurrentlyNominated(isNominated(movie));
    // eslint-disable-next-line
  }, [nominated])


  function nominateMovie(movie) {
    if (nominated.length < NOMINATE_LIMIT) {
      setNominated([...nominated, movie]);
    } else {
      console.log("Nomination limit reached!");
      console.log(nominated);
    }
  }

  return (
    <div className="movie-result">
      <div className="movie-poster">
        {movie.Poster === "N/A" ?
          <img src={require('../img/na.png').default} alt="poster-n/a" /> // poster not available
          :
          <img src={movie.Poster} alt="poster" /> // poster available
        }
      </div>
      <div className="movie-info">
        <div className="movie-title">{movie.Title}</div>
        <div className="movie-year">{movie.Year}</div>
      </div>
      
      <div className="movie-button">
        <button className={currentlyNominated ? "nominate-button nominate-button-disabled" : "nominate-button nominate-button-enabled"}
          disabled={currentlyNominated}
          onClick={e => nominateMovie(movie)}
        >
          {currentlyNominated ?
            <div>
              <i className="fas fa-check-circle" />
              &nbsp;Nominated
            </div>
            :
            <div>
              <i className="fas fa-mouse-pointer" />
              &nbsp;Nominate
            </div>
          }
        </button>
      </div>
    </div>
  );
}

export default MovieResult;