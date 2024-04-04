import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchResults from "./SearchResults";

const Navigation = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/travel_recommendation_api.json");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = () => {
    if (!data) return; // Ensure data is loaded before searching
    const lowerCaseSearchValue = searchValue.toLowerCase();
    const filteredResults = data.countries.reduce((acc, country) => {
      // Search for countries
      if (country.name.toLowerCase().includes(lowerCaseSearchValue)) {
        acc.push(...country.cities);
      } else {
        // Search for cities within countries
        const cities = country.cities.filter((city) =>
          city.name.toLowerCase().includes(lowerCaseSearchValue)
        );
        acc.push(...cities);
      }
      return acc;
    }, []);

    // Search for temples
    const templeResults = data.temples.filter((temple) =>
      temple.name.toLowerCase().includes(lowerCaseSearchValue)
    );
    filteredResults.push(...templeResults);

    // Search for beaches
    const beachResults = data.beaches.filter((beach) =>
      beach.name.toLowerCase().includes(lowerCaseSearchValue)
    );
    filteredResults.push(...beachResults);

    setSearchResults(filteredResults);
  };

  const handleClear = () => {
    setSearchValue("");
    setSearchResults([]);
  };
  return (
    <>
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
        </ul>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
          <button onClick={handleClear}>Clear</button>
        </div>
      </nav>
      <div>
        {searchResults.length > 0 && (
          <SearchResults searchResults={searchResults} />
        )}
      </div>
    </>
  );
};

export default Navigation;
