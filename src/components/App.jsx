import React, { Component } from "react";

import { nanoid } from "nanoid";

import style from './App.module.css';

import { ContactForm } from "./ContactForm/ContactForm";
import { Filter } from "./Filter/Filter";
import { ContactList } from "./ContactList/ContactList";

const CONTACTS_KEY = 'CONTACTS_KEY';

export class App extends Component {

  state = {
    contacts: [],
    filter: '',
  }

  componentDidMount() {
    const savedContacts = JSON.parse(localStorage.getItem(CONTACTS_KEY));
    savedContacts && this.setState(({ contacts: savedContacts }));
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem(CONTACTS_KEY, JSON.stringify(this.state.contacts));
    }
  }

    onFormSubmit = (e) => {
      e.preventDefault();
      let alredyContact = null;
      const form = e.target;
      const name = form.elements.name.value;
      this.state.contacts.forEach(contact => {
        if (contact.name.toLocaleLowerCase() === name.toLocaleLowerCase()) {
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
      this.setState(prevState => ({
        contacts: [newContact, ...prevState.contacts]
      }))
    }

    onFilter = (e) => {
        this.setState({filter: e.target.value})
    }

    getSearchContact = () => {
      const normalizedSearchContacts = this.state.filter.toLowerCase();
      return this.state.contacts.filter(contact => contact.name.toLowerCase().includes(normalizedSearchContacts))
    }
    onDeleteContact = (id) => {
      this.setState(prevState => ({
        ...prevState,
        contacts: prevState.contacts.filter(contact => contact.id !== id)
      }))
    }


    render() {
      const actuallyContacts = this.getSearchContact();

      return <div className={style.container}>
       <h1>Phonebook</h1>
       <ContactForm
        onSubmitFunction={this.onFormSubmit} />

      <Filter 
      onFilter={this.onFilter} />

      <h2>Contacts</h2>

      <ContactList 
        contact={actuallyContacts}
        onDeleteContact={this.onDeleteContact} />
      </div>
    }
};
