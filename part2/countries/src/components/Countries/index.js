import Country from "../Country";

const Countries = ({ countries, onClick }) => {
  if (countries.length > 10)
    return <div>Too many matches, specify another filter</div>;
  else if (countries.length > 1)
    return countries.map((country) => (
      <div key={country.cca3}>
        {country.name.common}{" "}
        <button onClick={() => onClick(country.name.common)}>show</button>
      </div>
    ));
  else if (countries.length === 1) {
    return <Country country={countries[0]} />;
  } else return null;
};

export default Countries;
