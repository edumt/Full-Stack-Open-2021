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
    const country = countries[0];
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
      </div>
    );
  } else return null;
};

export default Countries;
