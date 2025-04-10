'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
//
import { useUser } from '@/context/UserContext';
//
import useVerify from '@/hooks/use-verify';

interface Props {
    children: React.ReactNode;
}
export default function RequireAuth({ children }: Props) {
    //const { isLoading, isAuthenticated } = useAppSelector(state => state.auth);
    const { isLoggedIn } = useUser();
    const { verifyUser } = useVerify();
    const router = useRouter();
    // Manejar la redirección en un efecto para evitar conflictos con el renderizado
    useEffect(() => {
        const checkAuth = async () => {
            if (!isLoggedIn) {
                toast.info('Comprobando el token...');
                try {
                    await verifyUser(); // Llama a verifyUser para verificar el token
                    toast.info('Usuario verificado por el backend');
                } catch (error) {
                    console.error('Error al verificar el token:', error);
                    toast.error('Redirigiendo al login...');
                    router.push('/auth/login2'); // Redirige si no se puede verificar
                }
            }
        }
        checkAuth();
    }, [isLoggedIn,verifyUser, router]);
    // Renderizar los hijos si el usuario está autenticado
    return <>{children}</>;
}