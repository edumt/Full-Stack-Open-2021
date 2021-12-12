import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (persons.some((person) => person.name === newName))
      alert(`${newName} is already added to phonebook`);
    else setPersons([...persons, { name: newName, number: newNumber }]);
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with{" "}
        <input onChange={(e) => setFilter(e.target.value)} value={filter} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name:{" "}
          <input onChange={(e) => setNewName(e.target.value)} value={newName} />
        </div>
        <div>
          number:{" "}
          <input
            onChange={(e) => setNewNumber(e.target.value)}
            value={newNumber}
          />
        </div>
        {/* <div>debug: {newName}</div> */}
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {filteredPersons.map((person) => (
          <p key={person.name}>
            {person.name} {person.number}
          </p>
        ))}
      </div>
    </div>
  );
};

export default App;
