import React, { Component } from 'react';
import propTypes from 'prop-types';
import { nanoid } from 'nanoid';
import styles from './Filter.module.scss';

const filterInputId = nanoid();

export default class Filter extends Component {
    static propTypes = { onFilterChange: propTypes.func.isRequired };

    state = {
        filter: '',
    };

    getInputData = evt => {
        this.setState({ [evt.currentTarget.name]: evt.currentTarget.value });
        this.props.onFilterChange(evt.currentTarget.value);
    };

    render() {
        return (
            <div className={styles.wrapper}>
                <label className={styles.label} htmlFor="filterInputId">
                    Find contacts by name
                </label>
                <input
                    id={filterInputId}
                    type="text"
                    name="filter"
                    value={this.state.filter}
                    onChange={this.getInputData}
                />
            </div>
        );
    }
}
