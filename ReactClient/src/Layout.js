import { Outlet } from 'react-router-dom';
import NavMenu from '@/components/menus/NavMenu';

export default function Layout() {
	return (
		<div className='d-flex flex-column min-vh-100'>
			<NavMenu/>

			<main className='container flex-grow-1'
			      style={{paddingTop: '75px'}}>
				<Outlet/>
			</main>

			<footer className='bg-dark text-white text-center px-5 py-3'>
				&copy;{new Date().getFullYear()} Christian LeVesque. This site and its source code are distributed under the terms of the
				<a href='https://opensource.org/licenses/unlicense'
				   target='_blank'>
					Unlicense
				</a>.
			</footer>
		</div>
	);
}