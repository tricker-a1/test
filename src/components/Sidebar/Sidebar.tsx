// modules
import React from 'react';
import clsx from 'clsx';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// utils
import { Route, ROUTES_ARR } from '../../router';
import { config, useConfig } from '../../store/slices/config';
// components
import Icon from '../Icon';
import Logo from '../Logo';
import SidebarLink from './SidebarLink';
// types
import { SidebarTheme } from './types';

interface Sidebar {
	className?: string;
	theme?: SidebarTheme;
}

const classes = {
	sidebar: {
		default:
			'relative h-full rounded-lg overflow-hidden py-8 transition-width duration-400 whitespace-nowrap transition-padding duration-300',
		open: 'w-60 pr-6 pl-2',
		close: 'w-20 pr-0 pl-0',
		theme: {
			default: 'bg-[#f8f9fb]',
			primary: 'bg-primary-700',
			dark: 'bg-gray-900',
		},
	},
	title: {
		theme: {
			default: 'text-primary',
			primary: 'text-white',
			dark: 'text-white',
		},
	},
	arrows: {
		theme: {
			default: 'text-gray-700',
			primary: 'text-gray-100',
			dark: 'text-white',
		},
	},
};

const Sidebar: React.FC<Sidebar> = (props) => {
	const { className, theme = 'default' } = props;
	const dispatch = useDispatch();
	const { sidebarOpen } = useConfig();
	const location = useLocation();

	const handleArrowClick = () => {
		const { openSidebar, closeSidebar } = config.actions;
		const func = sidebarOpen ? closeSidebar : openSidebar;
		dispatch(func());
	};

	const renderLink = (route: Route) => {
		if (!route.showInSidebar) return null;
		const isActive = location.pathname === route.path;
		return (
			<SidebarLink
				key={route.path}
				theme={theme}
				isActive={isActive}
				{...route}
			/>
		);
	};

	return (
		<div
			className={clsx(
				classes.sidebar.default,
				sidebarOpen ? classes.sidebar.open : classes.sidebar.close,
				classes.sidebar.theme[theme],
				className
			)}
		>
			<Logo color={classes.title.theme[theme]} short={!sidebarOpen} />
			<div className='flex flex-col gap-3 text-[12px] mt-28'>
				{ROUTES_ARR.map(renderLink)}
			</div>
			<div>
				{/* @TODO - add avatar ?? */}
				<button
					className={clsx(
						'absolute right-0 bottom-5 left-0 flex justify-center',
						sidebarOpen && 'rotate-180'
					)}
					onClick={handleArrowClick}
				>
					<Icon
						icon='double-arrow'
						color={classes.arrows.theme[theme]}
						width={28}
						height={28}
					/>
				</button>
			</div>
		</div>
	);
};

export default React.memo(Sidebar);
