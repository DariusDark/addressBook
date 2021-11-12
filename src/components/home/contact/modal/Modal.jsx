import React from 'react';
import './modal.css'

function Modal({ values: { name, phoneNumber }, active, setActive }) {
    console.log(active);
    return (
        <div className={active ? "modal-screen active" : "modal-screen"} onClick={(event) => { setActive(false); console.log('work') }}>
            <div className="modal__container">
                <div className="modal__body" onClick={(event) => event.stopPropagation()}>
                    <div className="modal__title">
                        <span className="modal__label">Name</span>
                        <span className="modal__text">
                            {name}
                        </span>
                    </div>
                    <div className="modal__phone">
                        <span className="modal__label">Phone Number</span>
                        <span className="modal__text">
                            {phoneNumber}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
