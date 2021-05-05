import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiKey } from '../constants/apiKey';

const SEARCH_LENGTH_LIMIT = 3;

const SearchResult = ({ searchQuery }) => {
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

  useEffect(() => {
    if (searchQuery.length >= SEARCH_LENGTH_LIMIT) {
      getSearchResult();
    }
  }, [searchQuery])
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