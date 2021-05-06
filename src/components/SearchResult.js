import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiKey } from '../constants/apiKey';
import { SEARCH_LENGTH_LIMIT, RESULTS_PER_PAGE, NUM_FETCH_MOVIES } from '../constants/Constants';
import MovieResult from './MovieResult';

const SearchResult = ({ searchQuery, nominated, setNominated }) => {
  const [searchResult, setSearchResult] = useState([]) // init
  const [resultExists, setResultExists] = useState(false);
  const [resultPage, setResultPage] = useState(0);
  const [loadingStatus, setLoadingStatus] = useState(0); // 0 = no query, 1 = loading, 2 = loaded

  async function getSearchResult() {
    // TODO: page = 1 by default, must get parameter to allow more extensive search

    let results = [];

    for (let page = 1; page <= (NUM_FETCH_MOVIES / 10); page += 1) {
      await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&s=${searchQuery}&type=movie&page=${page}`)
        .then(res => {
          const data = res.data;
          const result = data.Search;
          const resultExists = data.Response

          if (resultExists === "True") {
            // setSearchResult([...searchResult, ...result])
            results.push(...result);
            setResultExists(true);
          }
        })
    }

    setLoadingStatus(2);
    setSearchResult(results);

    // axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&s=${searchQuery}&type=movie`) // make search request
    //   .then(res => {
    //     const data = res.data;
    //     const result = data.Search;
    //     const resultExists = data.Response

    //     if (resultExists === "True") {
    //       setSearchResult(result);
    //       setResultExists(true);
    //     } else {
    //       setSearchResult([]);
    //       setResultExists(false);
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   })
  }



  useEffect(() => {
    setResultPage(0); // reset result page to 0 if search query changes
    setSearchResult([]);

    if (searchQuery === "") {
      setLoadingStatus(0);
      setSearchResult([]);
    } else if (searchQuery.length >= SEARCH_LENGTH_LIMIT) {
      setLoadingStatus(1);
      getSearchResult();
    }
    // eslint-disable-next-line
  }, [searchQuery])

  useEffect(() => {
    localStorage.setItem('shoppies-nomination', JSON.stringify(nominated));
  }, [nominated])

  return (
    loadingStatus === 2 ?
    // loaded
    <div className="search-result"
      style={{ marginBottom: searchResult.length > 0 ? "20px" : "0px" }}
    >
      { /* left page button */}
      { searchResult.length > 0 &&
        <div className={ resultPage === 0 ? "search-page-button search-page-button-disabled page-left" : "search-page-button search-page-button-enabled page-left" }
          onClick={() => {
            if (resultPage > 0) { setResultPage(resultPage - 1); }
          }}
        >
          <i className="fas fa-chevron-left" />
        </div>
      }

      { /* Search results */ }
      { ( searchQuery.length >= SEARCH_LENGTH_LIMIT && resultExists) &&
        searchResult
          .slice(resultPage * RESULTS_PER_PAGE, resultPage * RESULTS_PER_PAGE + RESULTS_PER_PAGE)
          .map(result => (
            <MovieResult nominated={nominated} setNominated={setNominated} movie={result} type="search" />
          ))
      }

      { /* right page button */ }
      { searchResult.length > 0 &&
        <div className={ searchResult.length > (resultPage + 1) * RESULTS_PER_PAGE ? "search-page-button search-page-button-enabled page-right" : "search-page-button search-page-button-disabled page-right" }
          style={{ visibility: searchQuery.length === 0 ? "hidden" : "visible" }}
          onClick={() => {
            if (searchResult.length > (resultPage + 1) * RESULTS_PER_PAGE) { setResultPage(resultPage + 1); }
          }}
        >
          <i className="fas fa-chevron-right" />
        </div>
      }
    </div>
    :
    loadingStatus === 1 ?
    // loading
    <div className="loading-result">
      Loading
    </div>
    :
    // no query
    <></>
  );
}

export default SearchResult;