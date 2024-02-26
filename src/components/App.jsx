import { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

const App = () => {
  const CONTACTS_LS_KEY = 'contacts';

  const getContactsFromLS = () => {
    const savedContacts = localStorage.getItem(CONTACTS_LS_KEY);
    return savedContacts ? JSON.parse(savedContacts) : [];
  };

  const [contacts, setContacts] = useState(getContactsFromLS());
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contactsJsonString = JSON.stringify(contacts);
    localStorage.setItem(CONTACTS_LS_KEY, contactsJsonString);
  }, [contacts]);

  const addContact = contact => {
    if (hasContact(contact.name)) {
      alert(`${contact.name} is already in contacts.`);
      return false;
    }

    setContacts([...contacts, contact]);
    return true;
  };

  const removeContact = contactId => {
    const updatedContacts = contacts.filter(
      contact => contact.id !== contactId
    );
    setContacts(updatedContacts);
  };

  const hasContact = name => {
    return contacts.find(
      contact => contact.name.toLowerCase().trim() === name.toLowerCase().trim()
    );
  };

  const getFilteredContacts = () => {
    if (!filter.trim()) {
      return contacts;
    }

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase().trim())
    );
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'start',
        paddingLeft: '24px',
        fontSize: 18,
        color: '#010101',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <h2>Contacts</h2>
      <Filter filter={filter} updateFilter={setFilter} />
      <ContactList
        contacts={getFilteredContacts()}
        removeContact={removeContact}
      />
    </div>
  );
};

export default App;
