// modules
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { createSlice } from '@reduxjs/toolkit';

import { serverUrl } from '../../constants';
import { useSelector } from 'react-redux';
// types
import { RootState } from '../types';
import { UploadDataResponse } from '../../types';

export const uploadApi = createApi({
	reducerPath: 'upload',
	baseQuery: fetchBaseQuery({ baseUrl: serverUrl }),
	endpoints: (builder) => ({
		getUploadStatus: builder.query<UploadDataResponse, void>({
			query: () => '/upload/status',
		}),
	}),
});

export const useUpload = () => useSelector((state: RootState) => state.upload);

export const { useGetUploadStatusQuery } = uploadApi;
