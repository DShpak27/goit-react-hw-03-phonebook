import React, { Component } from 'react';
import propTypes from 'prop-types';
import { nanoid } from 'nanoid';
import styles from './PhonebookEditor.module.scss';

const initialState = {
    name: '',
    number: '',
};

const nameInputId = nanoid();
const telInputId = nanoid();

export default class PhonebookEditor extends Component {
    static propTypes = { onSubmit: propTypes.func.isRequired };

    state = {
        name: '',
        number: '',
    };

    handleInputChange = evt => {
        this.setState({
            [evt.currentTarget.name]: evt.currentTarget.value,
        });
    };

    handleSubmit = evt => {
        evt.preventDefault();
        const id = nanoid();
        this.props.onSubmit({ ...this.state, id });
        this.formReset();
    };

    formReset = () => {
        this.setState({ ...initialState });
    };

    render() {
        return (
            <form className={styles.form} onSubmit={this.handleSubmit}>
                <label htmlFor={nameInputId} className={styles.label}>
                    Name
                </label>

                <input
                    id={nameInputId}
                    className={styles.input}
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleInputChange}
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                />
                <label htmlFor={nameInputId} className={styles.label}>
                    Number
                </label>
                <input
                    id={telInputId}
                    className={styles.input}
                    type="tel"
                    name="number"
                    value={this.state.number}
                    onChange={this.handleInputChange}
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                />

                <button type="submit" className={styles.btn}>
                    Add contact
                </button>
            </form>
        );
    }
}
