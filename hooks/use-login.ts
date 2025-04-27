//funcion creada por jhesua
import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
//
import { useUser } from '@/context/UserContext';

export default function useLogin() {
	const { setUser, setIsLoggedIn } = useUser();

	const router = useRouter();

	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const [isLoading, setIsLoading] = useState(false);

	const { email, password } = formData;

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setFormData({ ...formData, [name]: value });
	};

	const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsLoading(true);
		
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/jwt/create/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
				credentials: 'include',
			});

			if (!response.ok) {
				throw new Error('Failed to authenticate');
			}
			setIsLoggedIn(true);
			toast.success('Login successful!');
			router.push('/dashboard');
		} catch (error) {
			toast.error('Login failed. Please check your credentials.');
		} finally {
			setIsLoading(false);
		}
	};

	return {
		email,
		password,
		isLoading,
		onChange,
		onSubmit,
	};
}