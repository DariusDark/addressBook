export const ADD_CONTACTS = 'ADD_CONTACTS';
export const DELETE_CONTACT = 'DELETE_CONTACT';
export const CHANGE_PAGE = 'CHANGE_PAGE';
export const IS_FETCHING = 'IS_FETCHING';
export const ADD_CONTACT = 'ADD_CONTACT';
export const EDIT__CONTACT = 'EDIT__CONTACT';
export const INPUT_NAME = 'INPUT_NAME';
export const INPUT_PHONE = 'INPUT_PHONE';
export const TO_CONTACT = 'TO_CONTACT';
export const EDIT_CURRENT_CONTACT = 'EDIT_CURRENT_CONTACT';
export const EDIT_NAME = 'EDIT_NAME';
export const EDIT_PHONE = 'EDIT_PHONE';
export const ACCEPT_VALUE = 'ACCEPT_VALUE';
export const EDIT_IS_ACTIVE = 'EDIT_IS_ACTIVE';
export const SEARCHING_VALUE = 'SEARCHING_VALUE';
export const FIND_CONTACT = 'FIND_CONTACT';

export const findContact = () => {
    return  {
        type: FIND_CONTACT
    }
}

export const searchValue = (value) => {
    return {
        type: SEARCHING_VALUE,
        payload: value
    }
};

export const deleteContact = (id) => {
    return {
        type: DELETE_CONTACT,
        payload: id
    }
}

export const editable = (value) => {
    return {
        type: EDIT_IS_ACTIVE,
        payload: value
    }
}

export const changeAccept = () => {
    return {
        type: ACCEPT_VALUE
    }
}

export const toContact = (id) => {
    return {
        type: TO_CONTACT,
        payload: id
    }
}

export const addContacts = (values) => {
    return {
        type: ADD_CONTACTS,
        payload: values
    }
};

export const changePage = (id) => {
    return {
        type: CHANGE_PAGE,
        payload: id
    }
}

export const setFetch = () => {
    return {
        type: IS_FETCHING,
    }
}

export const addContact = () => {
    return {
        type: ADD_CONTACT
    }
}

export const editEmpty = (name, value) => {
    return {
        type: EDIT__CONTACT,
        payload: {
            name: name,
            value: value
        }
    }
}

export const changeValue = (name, value) => {
    return {
        type: EDIT_CURRENT_CONTACT,
        payload: {
            name: name,
            value: value
        }
    }
} 