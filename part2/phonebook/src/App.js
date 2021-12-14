import { useState, useEffect } from "react";
import personService from "./services/persons";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState(null);

  const sendNotification = (text, type) => {
    setNotificationMessage({ text, type });
    setTimeout(() => setNotificationMessage(null), 3000);
  };

  useEffect(() => {
    personService.getAll().then((data) => setPersons(data));
  }, []);

  const [filter, setFilter] = useState("");

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <Filter onChange={setFilter} />
      <h3>add a new</h3>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        sendNotification={sendNotification}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        filter={filter}
        setPersons={setPersons}
        sendNotification={sendNotification}
      />
    </div>
  );
};

export default App;
