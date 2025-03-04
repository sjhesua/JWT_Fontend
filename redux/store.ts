//El STORE es el unico lugar de la verdad este es el que contiene
//todo el estado de la aplicacion los MANAGERS
// Importamos la función configureStore de Redux Toolkit, que nos ayuda a configurar la tienda de Redux fácilmente.
import { configureStore } from '@reduxjs/toolkit';

// Importamos apiSlice, que es una configuración para manejar solicitudes API.
import { apiSlice } from './services/apiSlice';

// Importamos el reducer de autenticación, que maneja el estado relacionado con la autenticación del usuario.
import authReducer from './features/authSlice';

// Definimos una función llamada makeStore que crea y configura la store de Redux.
export const makeStore = () =>
    configureStore({
        // Definimos los "reducers" que manejarán diferentes partes del estado de la aplicación.
        reducer: {
            // Añadimos el reducer de apiSlice bajo su ruta definida.
            //[apiSlice.reducerPath]= 'api'
			[apiSlice.reducerPath]: apiSlice.reducer,
            // Añadimos el reducer de autenticación.
            auth: authReducer,
        },
        // Añadimos middleware adicional a la tienda.
        middleware: getDefaultMiddleware =>
            // Añadimos el middleware de apiSlice para manejar las solicitudes API.
            getDefaultMiddleware().concat(apiSlice.middleware),
        // Habilitamos las herramientas de desarrollo de Redux si no estamos en producción.
        //devTools: process.env.NODE_ENV !== 'production',
    });

// Definimos tipos para el store, el estado raíz y la función de despacho, mejorando la seguridad de tipos en la aplicación.
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];