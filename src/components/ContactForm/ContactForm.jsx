import React, { useState } from "react";
import PropTypes from 'prop-types';
import style from './ContactForm.module.css';

export const ContactForm = ({onSubmitFunction}) => {
    const [fieldValues, setFieldValues] = useState({
        name: '',
        number: '',
        })

    const onSubmitForm = (e) => {
        e.preventDefault();
        onSubmitFunction(e);
        resetStateForm();
        }

    const onInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFieldValues(prevState => ({
            ...prevState,
            [name]: value,
        }))
        }

    const resetStateForm = () => {
        setFieldValues ({
            name: '',
            number: '',
        })
        }

        return(
            <form onSubmit={onSubmitForm} className={style.searchForm}>
                <label htmlFor="Name">
                    Name
                    <input 
                    onInput={onInputChange}
                    value={fieldValues.name}
                    type="text" 
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                    />
                </label>

                <label htmlFor="Number">
                Number
                    <input 
                    onInput={onInputChange}
                    value={fieldValues.number}
                    type="text" 
                    name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    />
                </label>

                <button type="submit">Add contact</button>

            </form>
        )
    }


ContactForm.propTypes = {
    onSubmitFunction: PropTypes.func.isRequired,
}