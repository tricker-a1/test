// modules
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useConfig } from '../../store/slices/config';
// components
import Sidebar from '../Sidebar';

const Layout: React.FC = () => {
	const { sidebarOpen } = useConfig();
	return (
		<div className='w-full h-full flex'>
			<div className='p-3'>
				<Sidebar />
			</div>
			<div
				className='p-8 flex-1'
				style={{
					width: sidebarOpen ? 'calc(100% - 264px)' : 'calc(100% - 104px)',
				}}
			>
				<Outlet />
			</div>
		</div>
	);
};

export default Layout;
