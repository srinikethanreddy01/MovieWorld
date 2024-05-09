import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import searchIcon from './search.svg';

function App() {
  const [searchResults, setSearchResults] = useState([]);

  const [name,setName]=useState(null);

  const apiurl = "http://www.omdbapi.com?apikey=c032e2d7";

  const search = async (title) => {
    const res = await fetch(`${apiurl}&s=${title}`);
    const data = await res.json();
    const result = data.Search;

    setSearchResults(result);
  };

  useEffect(()=>{
    search("marvel")
  },[])

  return (
    <div className="app">
      <h1>Movie World</h1>
      <div className='search'>
        <input placeholder='search for movies' type="text" onChange={(e) => {setName(e.target.value) }} />
        <img src={searchIcon} alt="search" onClick={() => { search(name)}} />
      </div>
      <div className='container'>
        {searchResults.map(movie => (
          <div className='movie' key={movie.imdbID}>
            <div>
              <p>{movie.Year}</p>
            </div>
            <div>
              <img src={movie.Poster} alt={movie.Title} />
            </div>
            <div>
              <span>{movie.Type}</span>
              <h3>{movie.Title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
