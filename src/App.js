import './App.css';
import { DebounceInput } from 'react-debounce-input';
import { useState } from 'react';

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="App">
      <DebounceInput minLength={3} debounceTimeout={500} onChange = {e => setSearchQuery(e.target.value)} />
      { searchQuery }
    </div>
  );
}

export default App;
