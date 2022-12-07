import { Link } from 'react-router-dom';

export default function MainMenuLink({ icon, link, children }) {
	return (
		<div className="nav-item pe-3 py-2">
			<Link className="nav-link text-white"
			      to={link}>
				<i aria-hidden="true"
				   className={`fas fa-${icon}`}></i>
				{children}
			</Link>
		</div>
	)
}