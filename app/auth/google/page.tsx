'use client';

import { useSocialAuthenticateMutation } from '@/redux/features/authApiSlice';
import useSocialAuth from '@/hooks/use-social-auth';
import { Spinner } from '@/components/common';
import { Suspense } from 'react'

export default function Page() {
	

	return (
		<Suspense>
			<Google />
		</Suspense>
	);
}
const Google = () => {
	const [googleAuthenticate] = useSocialAuthenticateMutation();
	useSocialAuth(googleAuthenticate, 'google-oauth2');
	return (
		<div className='my-8'>
			<Spinner lg />
		</div>
	)
}