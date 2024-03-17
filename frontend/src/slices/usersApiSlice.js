import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		login: builder.mutation({
			query: (data) => ({
				//url: USERS_URL / auth
				url: USERS_URL,
				method: 'POST',
				body: data,
			}),
			keepUnusedDataFor: 5,
		}),
		
	}),
})

export const {useLoginMutation} = usersApiSlice