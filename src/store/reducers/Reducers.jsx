import {
    ADD_CONTACTS,
    DELETE_CONTACT,
    CHANGE_PAGE,
    IS_FETCHING,
    ADD_CONTACT,
    EDIT__CONTACT,
    INPUT_NAME,
    INPUT_PHONE,
    TO_CONTACT,
    EDIT_CURRENT_CONTACT,
    EDIT_NAME,
    EDIT_PHONE,
    ACCEPT_VALUE,
    EDIT_IS_ACTIVE,
    SEARCHING_VALUE,
    FIND_CONTACT
} from '../actions/Actions';

const empty = {
    name: '',
    phoneNumber: ''
}

let uniqueId = 0;

const initialState = {
    contacts: [],
    edit: empty,
    isFetching: true,
    currentElems: [],
    currentPage: 1,
    perPage: 6,
    totalPages: [],
    params: null,
    currentContact: {
        isEditActive: false,
        name: '',
        phoneNumber: '',
        userId: 0
    },
    searchValue: '',
    searchResult: []
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CONTACTS:
            return addContacts(state, action.payload);
        case CHANGE_PAGE:
            return changePage(state, action.payload);
        case IS_FETCHING:
            return isFetching(state);
        case EDIT__CONTACT:
            return editEmpty(state, action.payload);
        case ADD_CONTACT:
            return addContact(state);
        case TO_CONTACT:
            return toContact(state, action.payload);
        case EDIT_CURRENT_CONTACT:
            return editCurrentContact(state, action.payload);
        case ACCEPT_VALUE:
            return acceptValue(state);
        case EDIT_IS_ACTIVE:
            return editActive(state, action.payload);
        case DELETE_CONTACT:
            return deleteContact(state, action.payload);
        case SEARCHING_VALUE:
            return searchValue(state, action.payload);
        case FIND_CONTACT:
            return findContact(state);
        default:
            return { ...state };
    }
};

const findContact = (state) => {
    const { contacts, searchValue } = state;
    const resultName = contacts.filter(item => item.name.includes(searchValue));
    if (!resultName.length) {
        return {
            ...state,
            searchResult: 0
        }
    }
    return {
        ...state,
        searchResult: [...resultName]
    }
}

const searchValue = (state, value) => {
    return {
        ...state,
        searchValue: value
    }
}

const deleteContact = (state, id) => {
    const { contacts, perPage, currentPage, currentElems, currentContact } = state;
    let newContacts = [];
    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].uniqueId !== id) {
            newContacts.push(contacts[i]);
        }
    }
    currentElems.splice(id, 1);
    let { pages, calculatedElems } = calculateElems(newContacts.length, perPage, currentPage, currentElems, newContacts);
    return {
        ...state,
        contacts: [...newContacts],
        currentElems: [...calculatedElems],
        totalPages: [...pages],
        currentContact: {
            ...currentContact,
            isEditActive: false
        },
        searchResult: [],
        searchValue: ''
    };
};

const editActive = (state, value) => {
    const { currentContact, contacts } = state;
    if (value === 0) {
        const prevCurrentContact = contacts.filter(item => item.uniqueId === currentContact.userId);
        currentContact.name = prevCurrentContact[0].name;
        currentContact.phoneNumber = prevCurrentContact[0].phoneNumber;
        currentContact.isEditActive = false;
        return {
            ...state,
            currentContact: { ...currentContact }
        }
    }
    return {
        ...state,
        currentContact: { ...currentContact, isEditActive: value }
    };
};

const acceptValue = (state) => {
    let { contacts, currentContact, perPage, currentPage, currentElems } = state;
    const { userId, name, phoneNumber } = currentContact;
    contacts = contacts.map((item) => item.uniqueId !== userId ? item : { name: name, phoneNumber: phoneNumber, uniqueId: item.uniqueId });
    let { pages, calculatedElems } = calculateElems(contacts.length, perPage, currentPage, currentElems, contacts);
    return {
        ...state,
        contacts: [...contacts],
        currentElems: [...calculatedElems],
        totalPages: [...pages],
        currentContact: { ...currentContact, isEditActive: false },
        searchResult: [],
        searchValue: ''
    }
};

const editCurrentContact = (state, { name, value }) => {
    const { currentContact } = state;
    if (EDIT_NAME === name) {
        return {
            ...state,
            currentContact: {
                ...currentContact,
                name: value
            }
        }
    }
    if (EDIT_PHONE === name) {
        return {
            ...state,
            currentContact: {
                ...currentContact,
                phoneNumber: value
            }
        }
    }
    return {
        ...state
    }
}

const toContact = (state, id) => {
    let { currentContact, contacts } = state;
    let tempObj;
    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].uniqueId === id) {
            tempObj = contacts[i];
        }
    }
    currentContact = {
        ...currentContact,
        userId: id,
        name: tempObj.name,
        phoneNumber: tempObj.phoneNumber
    }
    return {
        ...state,
        currentContact: {
            ...currentContact
        },
        params: id
    }
}

const addContact = (state) => {
    let { edit, contacts, perPage, currentElems, currentPage } = state;
    const newContact = {
        ...edit,
        uniqueId: uniqueId++
    };
    contacts = [...contacts, { ...newContact }];
    let { pages, calculatedElems } = calculateElems(contacts.length, perPage, currentPage, currentElems, contacts);
    return {
        ...state,
        contacts: [...contacts],
        edit: empty,
        currentElems: [...calculatedElems],
        totalPages: [...pages]
    }
}

const editEmpty = (state, { name, value }) => {
    let { edit } = state;
    if (INPUT_NAME === name) {
        return {
            ...state,
            edit: { ...edit, name: value }
        };
    }
    if (INPUT_PHONE === name) {
        return {
            ...state,
            edit: { ...edit, phoneNumber: value }
        }
    }
}

const addContacts = (state, values) => {
    let { contacts, perPage, currentElems, currentPage } = state;
    contacts = values.map((item) => {
        return {
            name: item.name,
            phoneNumber: item.phone,
            uniqueId: uniqueId++
        }
    });
    let { pages, calculatedElems } = calculateElems(contacts.length, perPage, currentPage, currentElems, contacts);
    return {
        ...state,
        currentElems: [...calculatedElems],
        totalPages: [...pages],
        contacts: [...contacts],
        isFetching: false
    }
}

const calculateElems = (totalElems, perPage, currentPage, currentElems, contacts) => {
    let pages = [];
    for (let i = 1; i <= Math.ceil(totalElems / perPage); i++) {
        pages.push(i);
    }
    const start = --currentPage * perPage;
    const end = start + perPage;
    currentElems = contacts.slice(start, end);
    return {
        pages: pages,
        calculatedElems: currentElems,
    }
}

const changePage = (state, currentPage) => {
    let { perPage, contacts, currentElems } = state;

    const start = --currentPage * perPage;
    const end = start + perPage;

    currentElems = contacts.slice(start, end);
    return {
        ...state,
        currentElems: [...currentElems],
        currentPage: ++currentPage
    }
}

const isFetching = (state) => {
    return {
        ...state,
        isFetching: false,
    }
}