'use client';
//Esto se usa en el layout para que se pueda usar el store en la APP
import { makeStore } from './store';
import { Provider } from 'react-redux';

interface Props {
	children: React.ReactNode;
}

export default function CustomProvider({ children }: Props) {
	return <Provider store={makeStore()}>{children}</Provider>;
}