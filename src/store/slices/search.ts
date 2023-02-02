// modules
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { useSelector } from 'react-redux';
// types
import { RootState } from '../types';
import { Department, Manager, Location } from '../../types';

export const searchApi = createApi({
	reducerPath: 'search',
	baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_ENDPOINT }),
	endpoints: (builder) => ({
		searchDepartment: builder.query<Department[], string>({
			query: (searchString?: string) => {
				/** TODO - add real path */
				if (!searchString) return 'v2'; // return default list
				console.log('searchDepartment:', searchString);
				return 'v2';
			},
		}),
		searchLocation: builder.query<Location[], string>({
			query: (searchString?: string) => {
				/** TODO - add real path */
				if (!searchString) return 'v2'; // return default list
				console.log('searchLocation:', searchString);
				return 'v2';
			},
		}),
		searchManager: builder.query<Manager[], string>({
			query: (searchString?: string) => {
				/** TODO - add real path */
				if (!searchString) return 'v2'; // return default list
				console.log('searchManager:', searchString);
				return 'v2';
			},
		}),
	}),
});

export const useSearch = () => useSelector((state: RootState) => state.search);

export const {
	useLazySearchDepartmentQuery,
	useLazySearchLocationQuery,
	useLazySearchManagerQuery,
} = searchApi;
