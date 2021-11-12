import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchValue, findContact } from '../../store/actions/Actions';
import Contact from '../home/contact/Contact'
import './search.css';
import { SearchCircleOutline } from 'react-ionicons';



function Search() {
    const dispatch = useDispatch();
    const searchedValue = useSelector(state => state.searchValue);
    const searchResult = useSelector(state => state.searchResult);

    return (
        <div className="search">
            <h2 className="search-title">Search</h2>
            <form className="search__form" onSubmit={(event) => {
                event.preventDefault();
                dispatch(findContact());
            }}>
                <input className="input input__search" value={searchedValue} required onInput={(event) => {
                    dispatch(searchValue(event.target.value));
                }} type="text" placeholder="Search Contact" />
                <button className="btn btn-search" type="submit">
                    <SearchCircleOutline
                        className="search-icon"
                        color={'#757575'}
                        title={'Search'}
                    />
                </button>
            </form>
            <div className="contacts__list">
                {searchResult.length ? searchResult.map((item) => <Contact contact={item} id={item.uniqueId} key={item.uniqueId} />)
                    : searchResult === 0 ? <div className="empty-result">No result found</div> : null
                }
            </div>
        </div>
    )
}

export default Search
