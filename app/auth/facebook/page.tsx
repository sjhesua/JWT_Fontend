'use client';

import { useSocialAuthenticateMutation } from '@/redux/features/authApiSlice';
import useSocialAuth from '@/hooks/use-social-auth';
import { Spinner } from '@/components/common';
import { Suspense } from 'react'

export default function Page() {

	return (
		<Suspense>
			<Facebook />
		</Suspense>
	);
}
const Facebook = () => {
	const [facebookAuthenticate] = useSocialAuthenticateMutation();
	useSocialAuth(facebookAuthenticate, 'facebook');

	return (
		<div className='my-8'>
			<Spinner lg />
		</div>
	) 
}