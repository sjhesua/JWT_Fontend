'use client';

import { redirect } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';
import { Spinner } from '@/components/common';

interface Props {
	children: React.ReactNode;
}

export default function RequireAuth({ children }: Props) {

	const { isAuthenticated } = useAppSelector(state => state.auth);


	if (!isAuthenticated) {
		redirect('/auth/login');
	}

	return <>{children}</>;
}
