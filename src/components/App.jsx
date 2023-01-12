import React, { Component } from 'react';

import ContactsList from './ContactsList/ContactsList.jsx';
import PhonebookEditor from './PhonebookEditor/PhonebookEditor.jsx';
import Section from './Section/Section.jsx';
import Filter from './Filter/Filter.jsx';

export default class App extends Component {
    state = {
        contacts: [
            { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
            { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
            { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
            { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
        ],
        filter: '',
    };
    // state = {
    //     contacts: [],
    //     filter: '',
    // };

    getSubmittedData = data => {
        const { contacts } = this.state;

        for (let contact of contacts) {
            if (contact.name.toLowerCase() === data.name.toLowerCase()) {
                return alert(`${data.name} is already in contacts`);
            }
        }

        this.setState(prevState => {
            return { contacts: [...prevState.contacts, data] };
        });
    };

    handleFilter = data => {
        this.setState({ filter: data });
    };

    filterContactstoShow = () => {
        const { filter, contacts } = this.state;
        if (!filter) {
            return contacts;
        }
        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(filter.toLowerCase())
        );
    };

    deleteContact = idx => {
        const { contacts } = this.state;
        let updatedContacts = contacts.filter(({ id }) => {
            return idx !== id;
        });
        this.setState({ contacts: updatedContacts });
    };

    render() {
        return (
            <>
                <Section title="Phonebook">
                    <PhonebookEditor onSubmit={this.getSubmittedData} />
                </Section>
                {this.state.contacts.length > 0 && (
                    <Section title="Contacts">
                        <Filter onFilterChange={this.handleFilter} />
                        <ContactsList
                            contacts={this.filterContactstoShow()}
                            onContactDelete={this.deleteContact}
                        />
                    </Section>
                )}
            </>
        );
    }
}
