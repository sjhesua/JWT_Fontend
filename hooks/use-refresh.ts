//funcion creada por jhesua
import { useUser } from '@/context/UserContext';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
//-------------------------------------------------------

let refreshPromise: Promise<void> | null = null;
let isRefreshingToken = false;

export default function useVerify() {
	const { setUser, setIsLoggedIn } = useUser();
	const router = useRouter();

    const startTokenRefresh = async () => {
        if (!isRefreshingToken) {
            isRefreshingToken = true;
            refreshPromise = refreshToken().finally(() => {
                isRefreshingToken = false;
                refreshPromise = null; // Limpiar la promesa después de completar
            });
        }
        return refreshPromise!;
    };

	const refreshToken = async () => {
        toast.info('Intentando refrescar el token...');
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/jwt/refresh/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			});
			console.log('response', response);
			if (!response.ok) {
				throw new Error('Failed to authenticate');
			}
			setIsLoggedIn(true);
			toast.success('Token refrescado con éxito');
		} catch (error) {
			setIsLoggedIn(false);
			toast.error('Error al Intentar refrescarl el');
			// si no se logra verificar el token, redirigir a la página de login
			router.push('auth/login');
		}
	}
	
	return {
        refreshToken: startTokenRefresh,
	};
}