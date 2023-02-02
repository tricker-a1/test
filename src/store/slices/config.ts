// modules
import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { Config, RootState } from '../types';

const initialState: Config = {
	sidebarOpen: true,
};

export const config = createSlice({
	name: 'config',
	initialState,
	reducers: {
		openSidebar: (state) => ({ ...state, sidebarOpen: true }),
		closeSidebar: (state) => ({ ...state, sidebarOpen: false }),
	},
});

export const useConfig = () => useSelector((state: RootState) => state.config);
