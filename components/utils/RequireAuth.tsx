'use client';

import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';
import { Spinner } from '@/components/common';

interface Props {
    children: React.ReactNode;
}

export default function RequireAuth({ children }: Props) {
    const { isLoading, isAuthenticated } = useAppSelector(state => state.auth);

    // Manejar la redirección en un efecto para evitar conflictos con el renderizado
    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            redirect('/auth/login');
        }
    }, [isLoading, isAuthenticated]);

    // Mostrar un spinner mientras se carga el estado de autenticación
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                Autenticando...<Spinner />
            </div>
        );
    }
    // Renderizar los hijos si el usuario está autenticado
    return <>{children}</>;
}