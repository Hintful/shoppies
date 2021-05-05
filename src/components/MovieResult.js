import React, { useEffect, useState } from 'react';
import { NOMINATE_LIMIT, MAXIMUM_TITLE_LENGTH } from '../constants/Constants';

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
      <a target="_blank" href={`https://www.imdb.com/title/${movie.imdbID}`} rel="noreferrer noopener"> { /* Add link to imdb page */}
        <div className="movie-poster">
          {movie.Poster === "N/A" ?
            <img src={require('../img/na.png').default} alt="poster-n/a" /> // poster not available
            :
            <img src={movie.Poster} alt="poster" /> // poster available
          }
        </div>
      </a>
      <div className="movie-info">
        <a target="_blank" href={`https://www.imdb.com/title/${movie.imdbID}`} rel="noreferrer noopener">
          <div className="movie-title">
            { movie.Title.length > MAXIMUM_TITLE_LENGTH ? movie.Title.slice(0, MAXIMUM_TITLE_LENGTH) + "..." : movie.Title } { /* omit some characters if title is too long */ }
          </div>
        </a>
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