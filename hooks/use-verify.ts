import { useUser } from '@/context/UserContext';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import useRefresh from '@/hooks/use-refresh';
//-------------------------------------------------------

export default function useVerify() {
	const { setUser, setIsLoggedIn, isRefreshingToken, setIsRefreshingToken } = useUser();
	const { refreshToken } = useRefresh();

	const router = useRouter();

	const verifyUser = async () => {
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/jwt/verify/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			});
			
			if (!response.ok) {
                if (response.status === 401) {
                    await refreshToken(); // Usar la función compartida para manejar el refresco
                    return verifyUser(); // Reintentar la verificación después de refrescar
                } else {
                    toast.error('Error al autenticar.');
					throw new Error(`HTTP error! status: ${response.status}`);
				}
            }
			setIsLoggedIn(true);
			toast.info('Token verificado por el backend');
		} catch (error) {
			setIsLoggedIn(false);
			toast.error('Login failed. Please check your credentials.');
			router.push('auth/login');
		}
	}
	
	return {
		verifyUser,
	};
}