import MainMenuLink from '@/components/menus/MainMenuLink';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function NavMenu() {
	const [open, setOpen] = useState(false);

	function getNavMenuCssClass() {
		return open
		       ? 'align-self-end'
		       : 'collapse';
	}

	function getNavTogglerClass() {
		return open
		       ? 'times'
		       : 'bars';
	}

	function toggleNavMenu() {
		setOpen(!open);
	}

	return (
		<div className="navbar navbar-dark bg-dark flex-column fixed-top">
			<div className="container-fluid">
				<Link className="navbar-brand" 
				      to="/">
					Wikipedia Search App
				</Link>
				<button className="navbar-toggler" 
				        title="Navigation menu" 
				        onClick={toggleNavMenu}>
					<i className={`fas fa-${getNavTogglerClass()}`}></i>
				</button>
			</div>
		
			<div className={getNavMenuCssClass()} 
			     onClick={toggleNavMenu}>
				<nav className="flex-column">
					<MainMenuLink icon="home" 
					              link="/">
						Home
					</MainMenuLink>
					<MainMenuLink icon="search" 
					              link="/search">
						Search
					</MainMenuLink>
				</nav>
			</div>
		</div>
	)
}