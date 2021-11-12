import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './home.css';
import Contact from './contact/Contact';
import PaginationBtn from './paginationBtn/PaginationBtn';
import Loader from '../loader/Loader';
import { changePage } from '../../store/actions/Actions';

function Home() {
    const dispatch = useDispatch();
    const contacts = useSelector(state => state.currentElems);
    const totalPages = useSelector(state => state.totalPages);
    const loader = useSelector(state => state.isFetching);

    function handleClick(item) {
        dispatch(changePage(item));
    }

    return (
        <div className="contacts">
            <h2 className="contacts__title">Contacts</h2>
            {loader ? <Loader /> :
                <div className="contacts__list">
                    {contacts.length ? contacts.map((item) => <Contact contact={item} id={item.uniqueId} key={item.uniqueId} />) :
                        <div className='contacts__empty'>There is no Contacts</div>}
                </div>}
            <div className="pagination__row">
                {loader ? null :
                    totalPages.length ?
                        totalPages.map((item, index) =>
                            <PaginationBtn
                                item={item}
                                clickHandle={() => { handleClick(item) }}
                                key={index}
                            />) : null
                }
            </div>
        </div>
    )
}

export default Home
