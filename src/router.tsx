// modules
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
// components
import {
	Login,
	CompensationBands,
	CompensationCycles,
	Dashboard,
	Organization,
	Reports,
	Settings,
	Upload,
} from './pages';
import Demo from './components/demo';
import Layout from './components/Layout';
// types
import { IconType } from './components/Icon/types';

export interface Route {
	path: string;
	title: string;
	icon?: IconType;
	showInSidebar?: boolean;
	element: JSX.Element;
	layout?: boolean;
}

const lazy = (Component: React.FC) => (
	<React.Suspense>
		<Component />
	</React.Suspense>
);

/** All routes object */
export const ROUTES: Record<string, Route> = Object.freeze({
	login: {
		path: '/login',
		title: 'Login',
		element: lazy(Login),
	},
	demo: {
		path: '/demo',
		title: 'Demo page',
		element: lazy(Demo),
	},
	dashboard: {
		path: '/',
		title: 'Dashboard',
		element: lazy(Dashboard),
		icon: 'grid',
		index: true,
		layout: true,
		showInSidebar: true,
	},
	organization: {
		path: '/organization',
		title: 'Organization',
		element: lazy(Organization),
		icon: 'data-flow',
		layout: true,
		showInSidebar: true,
	},
	upload: {
		path: '/upload',
		title: 'Data Upload',
		element: lazy(Upload),
		icon: 'upload',
		layout: true,
		showInSidebar: true,
	},
	compensationBands: {
		path: '/compensation-bands',
		title: 'Compensation Bands',
		element: lazy(CompensationBands),
		icon: 'money-exchange',
		layout: true,
		showInSidebar: true,
	},
	compensationCycles: {
		path: '/compensation-cycles',
		title: 'Compensation Cycles',
		element: lazy(CompensationCycles),
		icon: 'circle-exchange',
		layout: true,
		showInSidebar: true,
	},
	reports: {
		path: '/reports',
		title: 'Reports',
		element: lazy(Reports),
		icon: 'file',
		layout: true,
		showInSidebar: true,
	},
	settings: {
		path: '/settings',
		title: 'Settings',
		element: lazy(Settings),
		icon: 'settings',
		layout: true,
		showInSidebar: true,
	},
});

/** All routes array */
export const ROUTES_ARR = Object.values(ROUTES);

/** Separated basic routes and routes with layout */
export const [BASIC_ROUTES, LAYOUT_ROUTS] = ROUTES_ARR.reduce<Route[][]>(
	(acc, c: Route) => {
		if (c.layout) acc[1].push(c);
		else acc[0].push(c);
		return acc;
	},
	[[], []]
);

export const router = createBrowserRouter([
	...BASIC_ROUTES,
	{
		path: '/',
		element: lazy(Layout),
		children: LAYOUT_ROUTS,
	},
]);
