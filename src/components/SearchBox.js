import React from 'react';
import { DebounceInput } from 'react-debounce-input';
import ReactTooltip from 'react-tooltip';

const SearchBox = ({ setSearchQuery }) => {
  return (
    <div className="search">
      <div className="search-bar">
        <i className="fas fa-search search-icon" style={{ color: "#bdbdbd", fontSize: "20px" }} />
        <DebounceInput className="search-bar-input" minLength={3} debounceTimeout={500} onChange={e => setSearchQuery(e.target.value)} 
          placeholder="Search by title"
        />
        <i className="fas fa-info-circle info-icon" style={{ color: "#bdbdbd", fontSize: "20px" }} 
          data-tip="Top 50 results will show up. Please search more specifically if the movie you're looking for is not showing up."
        />
      </div>
      <ReactTooltip effect="solid"/>
    </div>
  );
}

export default SearchBox;