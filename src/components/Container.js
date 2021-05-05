import React, { useState } from 'react';
import SearchBox from './SearchBox';
import SearchResult from './SearchResult';

const Container = () => {
  const [searchQuery, setSearchQuery] = useState(""); // state for storing search query

  return (  
    <div>
      <SearchBox setSearchQuery={setSearchQuery} />
      <SearchResult searchQuery={searchQuery} />
    </div>
  );
}
 
export default Container;