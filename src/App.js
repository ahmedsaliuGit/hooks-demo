import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState('redux');
  const [value, setValue] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();

    setQuery(value);
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        "https://hn.algolia.com/api/v1/search?query=" + query
      );
      console.log("WHATISGOINGONHERE::", res.data);
      setData(res.data);
    };

    fetchData();
  }, [query]);

  return (
    <div className="App">
      <form noValidate onSubmit={handleSubmit}>
        <input type='text' name='query' value={value} onChange={(e) => setValue(e.target.value)} />
        <button type='submit'>By query</button>
      </form>
      <ul>
        {data.hits.map((item) => (
          <li key={item.objectID}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
