import { useState, useEffect } from "react";
import axios from "axios";

import Filter from "./components/Filter";
import Countries from "./components/Countries";

const sortByName = (a, b) => (a > b ? 1 : b > a ? -1 : 0);

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  const filteredCountries = countries
    .filter(
      (country) =>
        country.name.common.toLowerCase().includes(filter.toLowerCase()) ||
        country.name.official.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => sortByName(a.name.common, b.name.common));

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => setCountries(response.data));
  }, []);

  return (
    <div>
      <Filter onChange={setFilter} />
      <Countries countries={filteredCountries} />
    </div>
  );
}

export default App;
