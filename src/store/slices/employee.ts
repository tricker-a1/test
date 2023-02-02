// modules
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
// types
import { OrderedColumns, RootState } from '../types';
import { serverUrl } from '../../constants';

const initialState: OrderedColumns = {
	orderedColumns: [],
};

export const employeeApi = createApi({
	reducerPath: 'employeePoint',
	baseQuery: fetchBaseQuery({ baseUrl: serverUrl }),
	endpoints: (builder) => ({
		getEmployee: builder.query<EmployeeDataResponse, void>({
			query: () => '/employees',
		}),
	}),
});

export const employee = createSlice({
	name: 'emloyee',
	initialState,
	reducers: {
		setOrderedColumns: (state, actions) => {
			return { ...state, orderedColumns: actions.payload };
		},
	},
});

export const useEmployee = () =>
	useSelector((state: RootState) => state.employee);

export const { useGetEmployeeQuery } = employeeApi;
