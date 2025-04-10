import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

interface UserData {
    first_name: string;
    last_name: string;
    email: string;
}

export default function useFetchUserData() {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

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
                throw new Error('Failed to authenticate');
            }

            const data = await response.json();
            setUserData(data);
        } catch (error) {
            console.error(error);
            toast.error('Error al pedir datos');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return { userData, isLoading };
}