import React, { useState } from 'react';
import Nominated from './Nominated';
import SearchBox from './SearchBox';
import SearchResult from './SearchResult';

const Container = () => {
  const [searchQuery, setSearchQuery] = useState(""); // state for storing search query
  const [nominated, setNominated] = useState([]);

  return (  
    <div>
      <SearchBox setSearchQuery={setSearchQuery} />
      <SearchResult searchQuery={searchQuery} nominated={nominated} setNominated={setNominated} />
      <Nominated nominated={nominated} setNominated={setNominated} />
    </div>
  );
}
 
export default Container;