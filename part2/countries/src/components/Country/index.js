import Weather from "../Weather";

const Country = ({ country }) => {
  const languages = [];
  for (const key in country.languages)
    languages.push(<li key={key}>{country.languages[key]}</li>);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h2>languages</h2>
      <ul>{languages}</ul>
      <img
        src={country.flags.png}
        alt={`${country.name.official} flag`}
        height="150px"
      />
      <Weather city={country.capital} />
    </div>
  );
};

export default Country;
