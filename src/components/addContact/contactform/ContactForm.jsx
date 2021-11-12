import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editEmpty, addContact, INPUT_NAME, INPUT_PHONE } from '../../../store/actions/Actions';
import './contactform.css';

function ContactForm() {
    const dispatch = useDispatch();
    const edit = useSelector(state => state.edit);
    return (
        <form
            className="form"
            onSubmit={(event) => {
                event.preventDefault();
                if (edit.name && edit.phoneNumber) {
                    dispatch(addContact());
                }
            }}
        >
            <div className="input__container">
                <input
                    className="input input__name"
                    required
                    value={edit.name}
                    onInput={(event) => {
                        const contactName = event.target.value;
                        dispatch(editEmpty(INPUT_NAME, contactName));
                    }}
                    type="text"
                    placeholder="Enter Contact Name"
                />
            </div>
            <div className="input__container">
                <input
                    className="input input__phone"
                    required
                    value={edit.phoneNumber}
                    onInput={(event) => {
                        const contactPhone = event.target.value;
                        dispatch(editEmpty(INPUT_PHONE, contactPhone))
                    }} type="number" placeholder="Enter Contact phone number"
                />
            </div>
            <div className="button__container">
                <button className="btn btn-submit" type="submit">Add User</button>
            </div>
        </form>
    )
}

export default ContactForm
