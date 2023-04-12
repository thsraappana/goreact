import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/data')
      .then(response => response.json())
      .then(data => setData(data.data));
  }, []);

  return (
    <div>
      <h1>Data:</h1>
      <ul>
        {data.map(item => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}

export default App;