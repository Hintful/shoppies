import React, { useState } from 'react';
import Nominated from './Nominated';
import SearchBox from './SearchBox';
import SearchResult from './SearchResult';

const Main = () => {
  const [searchQuery, setSearchQuery] = useState(""); // state for storing search query
  const [nominated, setNominated] = useState(() => {
    try {
      const localData = localStorage.getItem('shoppies-nomination'); // load nomination data from local storage if exists
      return localData ? JSON.parse(localData) : [];
    } catch (err) {
      console.log(err);
      return [];
    }
  });

  return (
    <div className="wrapper">
      <div className="logo">
        <div className="logo-image">
          <img src="https://cdn.shopify.com/shopifycloud/brochure/assets/brand-assets/shopify-logo-shopping-bag-full-color-66166b2e55d67988b56b4bd28b63c271e2b9713358cb723070a92bde17ad7d63.svg" alt="shopify-logo" />
        </div>
        <div className="logo-label"><em>The Shoppies</em></div>
      </div>
      <div className="container">
        <SearchBox setSearchQuery={setSearchQuery} />
        <SearchResult searchQuery={searchQuery} nominated={nominated} setNominated={setNominated} />
      </div>
      <div className="container">
        <Nominated nominated={nominated} setNominated={setNominated} />
      </div>
    </div>

  );
}

export default Main;