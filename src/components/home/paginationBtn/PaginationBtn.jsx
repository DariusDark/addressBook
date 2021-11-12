import React from 'react';
import { useSelector } from 'react-redux';
import './paginationBtn.css';

function PaginationBtn({ item, clickHandle }) {
    const currentPage = useSelector(state => state.currentPage);
    return (
        <div className="pagination__container">
            <button className={currentPage === item ? "pagination__btn active" : "pagination__btn"} onClick={clickHandle}>{item}</button>
        </div>
    )
}

export default PaginationBtn
