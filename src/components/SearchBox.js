import React from 'react';
import { DebounceInput } from 'react-debounce-input';

const SearchBox = ({ setSearchQuery }) => {
  return (
    <div className="search-input" style={{ fontSize: "24px" }}>
      <DebounceInput minLength={3} debounceTimeout={500} onChange={e => setSearchQuery(e.target.value)} />
    </div>
  );
}

export default SearchBox;