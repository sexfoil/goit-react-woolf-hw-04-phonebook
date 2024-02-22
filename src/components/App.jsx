import { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

class App extends Component {
  #LS_CONTACTS_KEY = 'contacts';

  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem(this.#LS_CONTACTS_KEY);
    if (savedContacts) {
      this.setState({ contacts: JSON.parse(savedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts.length !== prevState.contacts.length) {
      localStorage.setItem(
        this.#LS_CONTACTS_KEY,
        JSON.stringify(this.state.contacts)
      );
    }
  }

  addContact = contact => {
    if (this.hasContact(contact.name)) {
      alert(`${contact.name} is already in contacts.`);
      return false;
    }

    this.setState(prev => {
      const updatedContacts = [...prev.contacts, contact];
      return {
        contacts: updatedContacts,
      };
    });
    return true;
  };

  removeContact = contactId => {
    this.setState(prev => {
      const updatedContacts = prev.contacts.filter(
        contact => contact.id !== contactId
      );
      return {
        contacts: updatedContacts,
      };
    });
  };

  hasContact = name => {
    return this.state.contacts.find(
      element => element.name.toLowerCase().trim() === name.toLowerCase().trim()
    );
  };

  updateFilter = value => {
    this.setState(() => {
      return { filter: value };
    });
  };

  getFilteredContacts = () => {
    if (!this.state.filter.trim()) {
      return this.state.contacts;
    }

    return this.state.contacts.filter(contact =>
      contact.name
        .toLowerCase()
        .includes(this.state.filter.toLowerCase().trim())
    );
  };

  render() {
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
        <ContactForm addContact={this.addContact} />
        <h2>Contacts</h2>
        <Filter filter={this.state.filter} updateFilter={this.updateFilter} />
        <ContactList
          contacts={this.getFilteredContacts()}
          removeContact={this.removeContact}
        />
      </div>
    );
  }
}

export default App;
