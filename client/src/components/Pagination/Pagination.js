import React from 'react';
import './Pagination.css';
import { BsChevronDoubleRight, BsChevronDoubleLeft } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';

const Pagination = ({ setPage, page }) => {
    return (
        <div className='Page-container flex flex-between'>
            <NavLink to={`/?page=${page === 1 ? page : page - 1}`} className={`page-button flex ${page === 1 ? "disabled" : ""}`} onClick={() => { setPage(page === 1 ? page : page - 1) }}>
                <BsChevronDoubleLeft /> Prev
            </NavLink>
            <NavLink to={`/?page=${page === 3 ? page : page + 1}`} className={`page-button flex ${page === 3 ? "disabled" : ""}`} onClick={() => { setPage(page === 3 ? page : page + 1) }}>
                Next <BsChevronDoubleRight />
            </NavLink>
        </div>
    )
}

export default Pagination
