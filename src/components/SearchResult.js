import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiKey } from '../constants/apiKey';
import { SEARCH_LENGTH_LIMIT, RESULTS_PER_PAGE } from '../constants/Constants';
import MovieResult from './MovieResult';

const SearchResult = ({ searchQuery, nominated, setNominated }) => {
  const [searchResult, setSearchResult] = useState([]) // init
  const [resultExists, setResultExists] = useState(false);
  const [resultPage, setResultPage] = useState(0);

  function getSearchResult() {
    axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&s=${searchQuery}`) // make search request
      .then(res => {
        const data = res.data;
        const result = data.Search;
        const resultExists = data.Response

        if (resultExists === "True") {
          const movies = result.filter(({ Type }) => Type === "movie") // filter out non-movie results
          setSearchResult(movies);
          setResultExists(true);
        } else {
          setSearchResult([]);
          setResultExists(false);
        }
      })
      .catch(err => {
        console.log(err);
      })
  }



  useEffect(() => {
    setResultPage(0); // reset result page to 0 if search query changes
    if (searchQuery === "") {
      setSearchResult([]);
    } else if (searchQuery.length >= SEARCH_LENGTH_LIMIT) {
      getSearchResult();
    }
    // eslint-disable-next-line
  }, [searchQuery])

  useEffect(() => {
    localStorage.setItem('shoppies-nomination', JSON.stringify(nominated));
  }, [nominated])

  return (
    <div className="search-result">
      <div className={ resultPage === 0 ? "search-page-button search-page-button-disabled page-left" : "search-page-button search-page-button-enabled page-left" }
        onClick={() => {
          if (resultPage > 0) { setResultPage(resultPage - 1); }
        }}
      >
        <i className="fas fa-chevron-left" />
      </div>
      { searchQuery.length >= SEARCH_LENGTH_LIMIT && resultExists ?
        // result exists
        searchResult
          .slice(resultPage * RESULTS_PER_PAGE, resultPage * RESULTS_PER_PAGE + RESULTS_PER_PAGE)
          .map(result => (
            <MovieResult nominated={nominated} setNominated={setNominated} movie={result} />
          ))

        :

        searchQuery.length < SEARCH_LENGTH_LIMIT ?
          <div className="movie-no-result">No results</div>

        :

        // no results
        <div className="movie-no-result">
          No results
        </div>
      }
      <div className={ searchResult.length > (resultPage + 1) * RESULTS_PER_PAGE ? "search-page-button search-page-button-enabled page-right" : "search-page-button search-page-button-disabled page-right" }
        onClick={() => {
          if (searchResult.length > (resultPage + 1) * RESULTS_PER_PAGE) { setResultPage(resultPage + 1); }
        }}
      >
        <i className="fas fa-chevron-right" />
      </div>
    </div>
  );
}

export default SearchResult;