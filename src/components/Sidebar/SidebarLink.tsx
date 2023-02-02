// modules
import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
// components
import { Route } from '../../router';
import Icon from '../Icon';
// utils
import { useConfig } from '../../store/slices/config';
// types
import { SidebarTheme } from './types';

interface SidebarLinkProps extends Route {
	isActive?: boolean;
	theme: SidebarTheme;
}

const classes = {
	container: {
		default:
			'flex w-full h-9 items-center gap-2 cursor-pointer transition-all duration-100 pl-5',
		theme: {
			default: {
				default: 'text-black hover:text-primary',
				active: 'text-primary',
			},
			primary: {
				default: 'text-white hover:text-gray-100',
				active: '',
			},
			dark: {
				default: 'text-white hover:text-gray-100',
				active: '',
			},
		},
	},
	bar: {
		default: 'rounded-full w-1.5 h-5 absolute left-0 -translate-x-2/4',
		open: 'opacity-100',
		close: 'opacity-0',
		theme: {
			default: 'bg-primary',
			primary: 'bg-white',
			dark: 'bg-white',
		},
	},
	icon: {
		default:
			'select-none rounded-full h-9 w-9 flex justify-center items-center',
		theme: {
			default: {
				active: 'bg-primary text-white',
				inactive: 'bg-transparent text-black',
			},
			primary: {
				active: 'bg-white text-primary',
				inactive: 'bg-transparent text-white',
			},
			dark: {
				active: 'bg-white text-gray-900',
				inactive: '',
			},
		},
	},
};

const SidebarLink: React.FC<SidebarLinkProps> = (props) => {
	const { isActive, title, path, icon, theme } = props;
	const { sidebarOpen } = useConfig();

	return (
		<Link
			key={path}
			className={clsx(
				classes.container.default,
				classes.container.theme[theme].default,
				isActive && classes.container.theme[theme].active
			)}
			to={path}
		>
			<div
				className={clsx(
					classes.bar.default,
					isActive && classes.bar.theme[theme],
					sidebarOpen ? classes.bar.open : classes.bar.close
				)}
			></div>
			{icon && (
				<div
					className={clsx(
						classes.icon.default,
						isActive
							? classes.icon.theme[theme].active
							: classes.icon.theme[theme].inactive
					)}
				>
					<Icon icon={icon} width={36} height={36} />
				</div>
			)}
			<div
				className={clsx(
					'transition-opacity duration-300 w-0',
					sidebarOpen ? classes.bar.open : classes.bar.close
				)}
			>
				{title}
			</div>
		</Link>
	);
};

export default React.memo(SidebarLink);
