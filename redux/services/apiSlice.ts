/*
https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#automatic-re-authorization-by-extending-fetchbasequery
Automatic re-authorization by extending fetchBaseQuery

This example wraps fetchBaseQuery such that when encountering a 401 Unauthorized error, 
an additional request is sent to attempt to refresh an authorization token, 
and re-try to initial query after re-authorizing.

*/
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { setAuth, logout } from '../features/authSlice';

import { Mutex } from 'async-mutex';

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
	baseUrl: `${process.env.NEXT_PUBLIC_HOST}/api`,
	credentials: 'include',
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown,	FetchBaseQueryError> = async (args, api, extraOptions) => {
	//Espera a que el mutex se libere antes de continuar. 
	//Esto asegura que solo una solicitud de reautenticación 
	//se procese a la vez.
	await mutex.waitForUnlock();
	//hacemos la solicitud y guardamos a ver que podemos hacer
	let result = await baseQuery(args, api, extraOptions);
	/*si no se tiene acceso intentara utilizar el token para refrescar*/
	if (result.error && result.error.status === 401) {
		//para asegurarnos que no se este haciendo mas de una
		//reautenticacion
		if (!mutex.isLocked()) {
			const release = await mutex.acquire();
			try {
				const refreshResult = await baseQuery(
					{
						/*BASEURL/jwt/refresh*/
						url: '/jwt/refresh/',
						method: 'POST',
					},
					api,
					extraOptions
				);
				/*si se logra refrescar*/
				if (refreshResult.data) {
					/*se ejecuta setAuth*/
					api.dispatch(setAuth());
					result = await baseQuery(args, api, extraOptions);
				} else {
					api.dispatch(logout());
				}
				if (result.error?.status === 401 && refreshResult?.error) {
                    return refreshResult;
                }
			} finally {
				release();
			}
		} else {
			await mutex.waitForUnlock();
			result = await baseQuery(args, api, extraOptions);
		}
	}
	return result;
};

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: baseQueryWithReauth,
	/*Los endpoints se incertan en feactures/authApiSlice*/
	endpoints: builder => ({}),
});