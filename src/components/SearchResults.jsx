const SearchResults = ({ searchResults }) => {
  return (
    <div className="search-results">
      {searchResults.map((city) => (
        <div key={city.name} className="card">
          <img src={city.imageUrl} alt={city.name} />
          <div className="card-body">
            <h3>{city.name}</h3>
            <p>{city.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
