import { useState } from "react";
import personService from "../../services/persons";

const PersonForm = ({ persons, setPersons, sendNotification }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleSubmit = (e) => {
    const newPerson = { name: newName, number: newNumber };
    e.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const id = persons.find((person) => person.name === newName).id;
        personService
          .update(id, newPerson)
          .then((updatedPerson) => {
            setPersons([
              ...persons.filter((person) => person.id !== id),
              updatedPerson,
            ]);
            sendNotification(`Updated ${updatedPerson.name}`, "success");
          })
          .catch((error) =>
            sendNotification(error.response.data.error, "error")
          );
      }
    } else
      personService
        .create(newPerson)
        .then((createdPerson) => {
          setPersons([...persons, createdPerson]);
          sendNotification(`Added ${createdPerson.name}`, "success");
        })
        .catch((error) => sendNotification(error.response.data.error, "error"));
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
