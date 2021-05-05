import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiKey } from '../constants/apiKey';
import { SEARCH_LENGTH_LIMIT, NOMINATE_LIMIT } from '../constants/Constants';

const SearchResult = ({ searchQuery, nominated, setNominated }) => {
  const [searchResult, setSearchResult] = useState([]) // init
  const [resultExists, setResultExists] = useState(false);

  function getSearchResult() {
    axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&s=${searchQuery}`) // make search request
      .then(res => {
        const data = res.data;
        const result = data.Search;
        const numResults = data.totalResults;
        const resultExists = data.Response

        if (resultExists === "True") {
          setSearchResult(result);
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

  function isNominated(movie) {
    return nominated.find( ({ imdbID }) => imdbID === movie.imdbID ) !== undefined;
  }

  function nominateMovie(movie) {
    if (nominated.length < NOMINATE_LIMIT) {
      setNominated([...nominated, movie]);
    } else {
      console.log("Nomination limit reached!");
      console.log(nominated);
    }
  }

  useEffect(() => {
    if (searchQuery.length >= SEARCH_LENGTH_LIMIT) {
      getSearchResult();
    }
  }, [searchQuery])

  useEffect(() => {
    localStorage.setItem('shoppies-nomination', JSON.stringify(nominated));
  }, [nominated])

  return (
    <div>
      { searchQuery.length >= SEARCH_LENGTH_LIMIT && resultExists ?
        // result exists
        searchResult.map(result => (
          <div className="movie-result">
            Title: {result.Title} <br />
            Year: {result.Year} <br />
            ID: {result.imdbID} <br />
            Type: {result.Type} <br />
            <button
              disabled={isNominated(result)}
              onClick={e => nominateMovie(result)}
            >
              Nominate
            </button>
          </div>
        ))

        :

        searchQuery.length < SEARCH_LENGTH_LIMIT ? 
        // search query too short
        <div>
          Type in at least 3 characters!
        </div>
        
        :

        // no results
        <div className="movie-result">
          No results
        </div>
    
    }
    </div>
  );
}

export default SearchResult;