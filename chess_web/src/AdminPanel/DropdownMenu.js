import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';


import './DropdownMenu.css';


export const DropdownUser = () => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);

	
	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const closeDropdown = (e) => {
		if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener('click', closeDropdown);
	
		return () => {
			document.removeEventListener('click', closeDropdown);
		};
	}, []);

	return (
		<div className="dropdown-container" ref={dropdownRef}>
			<button className="navigation-menu-link" id='btn-link' onClick={toggleDropdown}>
				User Management
			</button>
			{isOpen && (
				<ul className="dropdown-list">
					<li><Link className="navigation-menu-link" to="/usercontroller">User List</Link></li>
					
				</ul>
				)}
		</div>
	);
};

export const  DropdownLeague = () => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);

	
	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const closeDropdown = (e) => {
		if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener('click', closeDropdown);
	
		return () => {
			document.removeEventListener('click', closeDropdown);
		};
	}, []);

	return(
		<div className="dropdown-container" ref={dropdownRef}>
			<button className="navigation-menu-link" id='btn-link' onClick={toggleDropdown}>
				League Controller
			</button>
			{isOpen && (
				<ul className="dropdown-list">
					<li><Link className="navigation-menu-link" to="/leaguecontroller">Create League</Link></li>
					<li><Link className="navigation-menu-link" to="/editleague">Edit Leagues</Link></li>
					<li><Link className="navigation-menu-link" to="/roundcontroller">Generator</Link></li>
				</ul>
				)}
		</div>
	);
}
		
		