// modules
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// types
import { Team } from '../../types';

export const teamApi = createApi({
	reducerPath: 'team',
	baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_ENDPOINT }),
	endpoints: (builder) => ({
		getTeamMembers: builder.query<Team, string>({
			query: () => 'v2' /** TODO - add real path */,
		}),
	}),
});

export const { useGetTeamMembersQuery } = teamApi;
