import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '@/pages/Home';
import Layout from '@/Layout';
import Search from '@/pages/Search';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout/>,
		children: [
			{
				index: true,
				element: <Home/>
			},
			{
				path: 'search',
				element: <Search/>
			}
		]
	}
]);

createRoot(document.getElementById('app'))
	.render(<RouterProvider router={router}/>);