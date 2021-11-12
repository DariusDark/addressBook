import React from 'react';
import { useSelector } from 'react-redux';
import './addcontact.css';
import Loader from '../loader/Loader';
import ContactForm from './contactform/ContactForm';

function AddContact() {
    const loader = useSelector(state => state.isFetching);
    return (
        <div className="add-user">
            <h2 className="form__title">Add User</h2>
            {loader ? <Loader /> : <ContactForm /> }
        </div>
    )
}

export default AddContact
