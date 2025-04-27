'use client';

import useFetchUserData from '@/hooks/use-userme';
import List from '@/components/common/List';
import Spinner from '@/components/common/Spinner';
import { useEffect } from 'react';
import { useUser } from '@/context/UserContext';

export default function Page() {
    
    useEffect(() => {

    },[]);

    const { userData, isLoading } = useFetchUserData();

    const config = [
        {
            label: 'First Name',
            value:userData?.first_name,
        },
        {
            label: 'Last Name',
            value: userData?.last_name,
        },
        {
            label: 'Email',
            value: userData?.email,
        },
    ];

    if (isLoading) {
        return (
            <div className='flex justify-center my-8'>
                <Spinner lg />
            </div>
        );
    }
    
    return (
        <>
            <header className='bg-white shadow'>
                <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
                    <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
                        Dashboard
                    </h1>
                </div>
            </header>
            <main className='mx-auto max-w-7xl py-6 my-8 sm:px-6 lg:px-8'>
                <List config={config} />
            </main>
        </>
    );
}