import React from 'react';
import { NOMINATE_LIMIT, MAXIMUM_TITLE_LENGTH } from '../constants/Constants';
import toast, { Toaster } from 'react-hot-toast';

const MovieResult = ({ nominated, setNominated = null, removeNominated = null, movie, type }) => {

  function isNominated(movie) {
    return nominated.find(({ imdbID }) => imdbID === movie.imdbID) !== undefined;
  }

  function nominateMovie(movie) {
    if (nominated.length < NOMINATE_LIMIT) {
      setNominated([...nominated, movie]);
      notifyNominateSuccess();
    } else {
      notifyNominateFail();
    }
  }

  function removeMovie(movie) {
    removeNominated(movie);
    notifyRemoveSuccess();
  }

  const notifyNominateSuccess = () => { toast.dismiss(); toast.success('Nominated!'); }
  const notifyRemoveSuccess = () => { toast.dismiss(); toast.success('Removed!'); }
  const notifyNominateFail = () => { toast.dismiss(); toast.error('No more movies can be nominated!'); }

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
        { type === "search" ?
          // button when type is search
          <button className={isNominated(movie) ? "nominate-button nominate-button-disabled" : "nominate-button nominate-button-enabled"}
            disabled={isNominated(movie)}
            onClick={() => nominateMovie(movie)}
          >
            {isNominated(movie) ?
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
          :
          // button when type is nomination
          <button className="nominate-button remove-nomination-button"
            onClick={() => removeMovie(movie)}
          >
            <i className="fas fa-trash-alt" />
            &nbsp;Remove
          </button>
        }
      </div>
      <Toaster />
    </div>
  );
}

export default MovieResult;