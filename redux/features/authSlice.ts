//manejo de ESTADOS para saber si se esta autenticado
import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
	isAuthenticated: boolean;
	isLoading: boolean;
}

const initialState = {
	isAuthenticated: false,
	isLoading: true,
} as AuthState;

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuth: (state)  => {
			state.isAuthenticated = true;
		},
		//este estado globla es el que utilizamos para saber 
		// si el usuario esta autenticado
		logout: (state)  => {
			state.isAuthenticated = false;
		},
		finishInitialLoad: (state)  => {
			state.isLoading = false;
		},
	},
});

export const { setAuth, logout, finishInitialLoad } = authSlice.actions;
export default authSlice.reducer;