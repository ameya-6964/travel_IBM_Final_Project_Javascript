let Data;

function resetSearch() {
  document.querySelector(".search-input").value = "";
  displayResults([]); // Clear displayed results
}

function fetchData() {
  const keyword = document
    .getElementById("searchInput")
    .value.trim()
    .toLowerCase();
  if (keyword === "") {
    console.log("Please enter a valid search keyword.");
    return;
  }

  fetch("./travel_recommendation_api.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      Data = data;
      filterResults(keyword);
    })
    .catch((error) => {
      console.error("There Was Problem While Fethching The Data", error);
    });
}

function displayResults(results) {
  console.log(results);
  const cardsContainer = document.getElementById("displayData");
  cardsContainer.innerHTML = ""; // Clear previous results

  results.forEach((city) => {
    const card = `
        <div class="card">
            <img src="${city.imageUrl}" alt="${city.name}">
            <h3>${city.name}</h3>
            <p>${city.description}</p>
        </div>
    `;
    cardsContainer.innerHTML += card;
  });
}

function filterResults(keyword) {
  const filteredCities = [];
  Data.countries.forEach((country) => {
    country.cities.forEach((city) => {
      if (
        city.name.toLowerCase().includes(keyword) ||
        city.description.toLowerCase().includes(keyword)
      ) {
        filteredCities.push(city);
      }
    });
  });

  if (keyword.toLowerCase().includes("temple")) {
    Data.temples.forEach((temple) => {
      filteredCities.push(temple);
    });
  }
  if (keyword.toLowerCase().includes("beach")) {
    Data.beaches.forEach((beach) => {
      filteredCities.push(beach);
    });
  }
  console.log(filteredCities);
  displayResults(filteredCities);
}
