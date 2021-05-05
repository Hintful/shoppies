import React from 'react';
import { DebounceInput } from 'react-debounce-input';

const SearchBox = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="search">
      <div className="search-bar">
        <i className="fas fa-search search-icon" style={{ color: "#bdbdbd", fontSize: "20px" }} />
        <DebounceInput className="search-bar-input" minLength={3} debounceTimeout={500} value={searchQuery} onChange={e => setSearchQuery(e.target.value)} 
          placeholder="Please enter title of the movie!"
        />
      </div>
    </div>
  );
}

export default SearchBox;