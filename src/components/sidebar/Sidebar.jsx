import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { HomeOutline } from 'react-ionicons';
import { SearchOutline } from 'react-ionicons';
import { PersonAddOutline } from 'react-ionicons';
import styled from 'styled-components';
import './sidebar.css';

function Sidebar() {
    const [homeActive, setHome] = useState(false);
    const [searchActive, setSearch] = useState(false);
    const [addUserActive, setAddUser] = useState(false);
    const history = useHistory();
    const location = history.location;
    useEffect(() => {
        switch (location.pathname) {
            case '/addUser':
                setHome(false)
                setSearch(false)
                setAddUser(true); break
            case '/search':
                setHome(false)
                setSearch(true)
                setAddUser(false); break
            default:
                setHome(true);
                setSearch(false);
                setAddUser(false);
        }
    }, [location.pathname])
    return (
        <div className="sidebar__options">
            <div className="sidebar__col">
                <Link className="sidebar__link" to="/">
                    <div onClick={() => {
                        if (!homeActive) {
                            setHome(true);
                            setSearch(false);
                            setAddUser(false);
                        }
                    }} className={homeActive ? "sidebar__option active" : "sidebar__option"}>
                        <div className="option__icon">
                            <HomeOutline />
                        </div>
                        <h2 className="option__subtitle">Home</h2>
                    </div>
                </Link>
                <Link className="sidebar__link" to="/search">
                    <div onClick={() => {
                        if (!searchActive) {
                            setHome(false);
                            setSearch(true);
                            setAddUser(false);
                        }
                    }} className={searchActive ? "sidebar__option active" : "sidebar__option"}>
                        <div className="option__icon">
                            <SearchOutline />
                        </div>
                        <h2 className="option__subtitle">Search</h2>
                    </div>
                </Link>
                <Link className="sidebar__link" to="/addUser">
                    <div onClick={() => {
                        if (!addUserActive) {
                            setHome(false);
                            setSearch(false);
                            setAddUser(true);
                        }
                    }} className={addUserActive ? "sidebar__option active" : "sidebar__option"}>
                        <div className="option__icon">
                            <PersonAddOutline />
                        </div>
                        <h2 className="option__subtitle">Add</h2>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Sidebar
