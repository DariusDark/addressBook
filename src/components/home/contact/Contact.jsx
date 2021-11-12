import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory} from 'react-router-dom';
import { toContact } from '../../../store/actions/Actions';
import './contact.css';

function Contact({ contact: { name, phoneNumber }, id }) {
    const dispatch = useDispatch();
    const history = useHistory();
    return (
        <div className="contact">
            <div className="contact__body"
                onClick={() => {
                    dispatch(toContact(id));
                    history.push(`/user/${id}`);
                }
                }
            >
                <div className="contact__title">
                    <span className="contact__label">Name</span>
                    <span className="contact__text">
                        {name}
                    </span>
                </div>
                <div className="contact__phone">
                    <span className="contact__label">Phone Number</span>
                    <span className="contact__text">
                        {phoneNumber}
                    </span>
                </div>
            </div>
        </div >
    )
}

export default Contact
