import React, { useState } from 'react';
import MovieResult from './MovieResult';
import { NOMINATE_LIMIT } from '../constants/Constants';
import toast, { Toaster } from 'react-hot-toast';

const Nominated = ({ nominated, setNominated, setSearchQuery }) => {
  function removeNomination(removedMovie) {
    setNominated(nominated.filter(movie => movie.imdbID !== removedMovie.imdbID));
  }

  function simulateSubmission() {
    setSubmitStatus(1);

    setTimeout(() => {
      setNominated([]); // reset nomination list
      notifySubmissionSuccess();
      setSubmitStatus(0);
    }, 2000)
  }

  const notifySubmissionSuccess = () => { toast.dismiss(); toast.success('Nomination Submitted!'); }

  const [submitStatus, setSubmitStatus] = useState(0); // 0 - idle, 1 - submitting

  return (
    <div className="nomination-container">
      <div className="nomination-title">
        Your nominations
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
          Please choose your top 5 movies!
        </div>
      }
      { nominated.length === NOMINATE_LIMIT &&
        // nomination completed
        <div className={submitStatus === 0 ? "nomination-complete" : "nomination-complete nomination-submitting"} onClick={() => simulateSubmission()}>
          <i className="fas fa-check-circle" />
          { submitStatus === 0 ? <span>Submit Nomination</span> : <span>Submitting...</span> }
        </div>
      }
      <Toaster />
    </div>
  );
}

export default Nominated;