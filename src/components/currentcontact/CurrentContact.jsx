import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { changeValue, EDIT_NAME, EDIT_PHONE, changeAccept, editable, deleteContact } from '../../store/actions/Actions';
import './currentcontact.css';

function CurrentContact() {
    const dispatch = useDispatch();
    const contact = useSelector(state => state.currentContact);
    const history = useHistory();
    return (
        <div className="current-contact">
            <form className="current-contact__form" onSubmit={(event) => {
                event.preventDefault();
                dispatch(changeAccept());
                history.push('/');
            }}>
                <div className="current-contact__container">
                    <div className="current-contact__label">Name</div>
                    <input
                        className={contact.isEditActive ?
                            "input current-contact__input active" :
                            "input current-contact__input"
                        }
                        required
                        type="text"
                        disabled={contact.isEditActive ? '' : 'disabled'}
                        value={contact.name}
                        onInput={(event) => { dispatch(changeValue(EDIT_NAME, event.target.value)) }}
                        placeholder="Enter new Name"
                    />
                </div>
                <div className="current-contact__container">
                    <div className="current-contact__label">Phone Number</div>
                    <input
                        className={contact.isEditActive ?
                            "input current-contact__input active" :
                            "input current-contact__input"}
                        required type="text"
                        disabled={contact.isEditActive ? '' : 'disabled'}
                        value={contact.phoneNumber}
                        onInput={event => { dispatch(changeValue(EDIT_PHONE, event.target.value)) }}
                        placeholder="Enter new Phone Number" />
                </div>
                {contact.isEditActive ?
                    <div className="current-contact__btn-container">
                        <button className="btn btn-submit" type="submit">Accept</button>
                        <button className="btn btn-cancel" type="button"
                            onClick={() => { dispatch(editable(0)) }}
                        >Cancel</button>
                    </div> :
                    null
                }
            </form>
            <button className="btn btn-back" onClick={() => {
                dispatch(editable(false));
                history.goBack();
            }}>Back</button>
            <button
                className="btn btn-edit"
                onClick={() => { dispatch(editable(true)) }}
            >Edit</button>
            <button
                className="btn btn-delete"
                onClick={() => {
                    dispatch(deleteContact(contact.userId))
                    history.push('/');
                }}>Delete</button>
        </div>
    )
}

export default CurrentContact
