import React from 'react';

const Nominated = ({ nominated, setNominated }) => {
  function removeNomination(removedMovie) {
    setNominated(nominated.filter(movie => movie.imdbID !== removedMovie.imdbID));
  }

  return (
    <div className="nomination-container">
      { nominated.length > 0 ?
        nominated.map(movie => (
          <div>
            { movie.Title}
            <button onClick={e => removeNomination(movie)}>
              Remove
          </button>
          </div>
        ))
        :
        <div className="no-nomination">
          No nominations
        </div>
    }
    </div>
  );
}

export default Nominated;