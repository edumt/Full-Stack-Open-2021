import { useState } from "react";
import personService from "../../services/persons";

const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleSubmit = (e) => {
    const newPerson = { name: newName, number: newNumber };
    e.preventDefault();
    if (persons.some((person) => person.name === newName))
      alert(`${newName} is already added to phonebook`);
    else
      personService
        .create(newPerson)
        .then((person) => setPersons([...persons, person]));
    setNewName("");
    setNewNumber("");
  };

  return (
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
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
