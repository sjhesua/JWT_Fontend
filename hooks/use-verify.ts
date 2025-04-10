import { useUser } from '@/context/UserContext';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
//-------------------------------------------------------

export default function useVerify() {
	const { setUser, setIsLoggedIn } = useUser();

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
				throw new Error('Failed to authenticate');
			}
			setIsLoggedIn(true);
			toast.info('Token verificado por el backend');
		} catch (error) {
			toast.error('Login failed. Please check your credentials.');
			// si no se logra verificar el token, redirigir a la página de login
			router.push('auth/login');
		} finally {
			setIsLoggedIn(false);
		}
	}
	
	return {
		verifyUser,
	};
}