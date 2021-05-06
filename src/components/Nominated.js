import React from 'react';
import MovieResult from './MovieResult';
import { NOMINATE_LIMIT } from '../constants/Constants';

const Nominated = ({ nominated, setNominated }) => {
  function removeNomination(removedMovie) {
    setNominated(nominated.filter(movie => movie.imdbID !== removedMovie.imdbID));
  }

  return (
    <div className="nomination-container">
      <div className="nomination-title">
        Your nomination
      </div>
      { nominated.length > 0 ?
        <div className="nominated-movies">
        {
          nominated.map((movie, idx) => (
            <MovieResult nominated={nominated} setNominated={setNominated} removeNominated={removeNomination} movie={movie} key={`movie-${idx}`}/>
          ))
        }
        </div>
        :
        <div className="no-nomination">
          No nominations
        </div>
      }
      { nominated.length === NOMINATE_LIMIT &&
        // nomination completed
        <div className="nomination-complete">
          Completed!
        </div>
      }
    </div>
  );
}

export default Nominated;