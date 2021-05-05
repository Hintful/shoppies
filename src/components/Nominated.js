import React from 'react';

const Nominated = ({ nominated, setNominated }) => {
  function removeNomination(removedMovie) {
    setNominated(nominated.filter(movie => movie.imdbID !== removedMovie.imdbID));
  }

  return (  
    <div>
      { nominated.map(movie => (
        <div>
          { movie.Title }
          <button onClick={e => removeNomination(movie)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
 
export default Nominated;