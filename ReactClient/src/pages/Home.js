import { useEffect } from 'react';

export default function Home() {
	useEffect(() => {document.title = 'Home'}, []);

	return (
		<>
			<h1 className="display-4">Wikipedia Search App</h1>

			<p>
				To get started, click on the hamburger menu in the upper right part of the screen, then click on the "Search" link.
			</p>

			<h2 className="h4">About the app</h2>

			<p>
				This app is the React equivalent of the&nbsp;
				<a
					href="https://blazor.workstate.levesque.dev"
					target="_blank"
				>
					Blazor Wikipedia Search App
				</a>. As such, no libraries or NPM packages were used beyond the requirements for setting up a React application. This app is meant to be identical to the Blazor app in every way.
			</p>.
		</>
	);
}