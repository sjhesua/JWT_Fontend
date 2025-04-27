//funcion creada por jhesua
import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import useRefresh from '@/hooks/use-refresh'; // Importa el hook useRefresh
interface UserData {
    first_name: string;
    last_name: string;
    email: string;
}

export default function useFetchUserData() {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { refreshToken } = useRefresh();
    const hasRefreshed = useRef(false);

    const fetchUserData = async () => {

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/users/me/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Asegura que las cookies se envíen con la solicitud
            });

            if (!response.ok) {
                if (response.status === 401 && !hasRefreshed.current) {
                    hasRefreshed.current = true;
                    toast.info('USER ME esta refrescando el token...');
                    await refreshToken(); 
                    return fetchUserData();
                } else {
                    toast.error('Error al autenticar.');
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            }
            const data = await response.json();
            setUserData(data);
        } catch (error) {
            toast.error('Error al pedir datos');
            console.error('Error fetching user data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return { userData, isLoading };
}