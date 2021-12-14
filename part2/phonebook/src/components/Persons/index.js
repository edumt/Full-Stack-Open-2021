import personService from "../../services/persons";

const Persons = ({ persons, filter = "", setPersons, sendNotification }) => {
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <div>
      {filteredPersons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}{" "}
          <button
            onClick={() => {
              if (window.confirm(`Delete ${person.name}?`)) {
                personService
                  .remove(person.id)
                  .catch(() =>
                    sendNotification(
                      `Information of ${person.name} has already been removed from server`,
                      "error"
                    )
                  );
                setPersons(
                  persons.filter((_person) => _person.id !== person.id)
                );
                sendNotification(`Removed ${person.name}`, "success");
              }
            }}
          >
            delete
          </button>
        </p>
      ))}
    </div>
  );
};

export default Persons;
