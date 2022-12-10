import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { nanoid } from "nanoid";

import style from './App.module.css';

import { ContactForm } from "./ContactForm/ContactForm";
import { Filter } from "./Filter/Filter";
import { ContactList } from "./ContactList/ContactList";


const CONTACTS_KEY = 'CONTACTS_KEY';

export const App = () => {
    const [contacts, setContacts] = useState(JSON.parse(localStorage.getItem(CONTACTS_KEY)) ?? []);
    const [filter, setFilter] = useState('');
  
    useEffect(() => {
      localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
    }, [contacts])

    const onFormSubmit = (e) => {
      e.preventDefault();
      let alredyContact = null;
      const form = e.target;
      const name = form.elements.name.value;
      contacts.forEach(contact => {
        if (contact.name.toLowerCase() === name.toLowerCase()) {
          alredyContact = true;
        }
      })

      if (alredyContact) {
        return alert(`${name} is already in contacts`);
      }
      const number = form.elements.number.value;
      const id = nanoid();
      const newContact = {
        id: id,
        name: name,
        number: number,
      }
      setContacts(prevState => {
        return [newContact, ...prevState]
      })
    }

      const onFilter = (e) => {
        setFilter(e.target.value)
      }

    const getSearchContact = () => {
      const normalizedSearchContacts = filter.toLowerCase();
      return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedSearchContacts))
    }
    const onDeleteContact = (id) => {
      setContacts(prevState => prevState.filter(contact => contact.id !== id)
      )
    }

    const actuallyContacts = getSearchContact();

          return <div className={style.container}>
          <h1>Phonebook</h1>
          <ContactForm
            onSubmitFunction={onFormSubmit} />

          <Filter 
          onFilter={onFilter} />

          <h2>Contacts</h2>

          {contacts.length > 0 && <ContactList 
            contact={actuallyContacts}
            onDeleteContact={onDeleteContact} />}
          </div>
    };

