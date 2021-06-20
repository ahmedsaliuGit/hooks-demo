import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState("redux");
  const [url, setUrl] = useState(
    `https://hn.algolia.com/api/v1/search?query=redux`
  );

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(url);

      setData(res.data);
    };

    fetchData();
  }, [url]);

  return (
    <Fragment>
      <input
        type="text"
        name="query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        onClick={() => 
          setUrl(`https://hn.algolia.com/api/v1/search?query=${query}`)
        }
        type="button"
      >
        Search
      </button>

      <ul>
        {data.hits.map((item) => (
          <li key={item.objectID}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

export default App;
