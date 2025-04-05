// Importamos los hooks y utilidades necesarias
import { useEffect, useRef } from 'react'; // useEffect para manejar efectos secundarios, useRef para mantener valores persistentes entre renderizados
import { useRouter, useSearchParams } from 'next/navigation'; // useRouter para manejar la navegación, useSearchParams para acceder a los parámetros de consulta de la URL
import { useAppDispatch } from '@/redux/hooks'; // Hook personalizado para acceder al dispatch de Redux
import { setAuth } from '@/redux/features/authSlice'; // Acción de Redux para establecer el estado de autenticación
import { toast } from 'react-toastify'; // Biblioteca para mostrar notificaciones al usuario

// Hook personalizado para manejar la autenticación social
export default function useSocialAuth(authenticate: any, provider: string) {
    // Obtenemos el dispatch de Redux para despachar acciones
    const dispatch = useAppDispatch();
    // Obtenemos el objeto router para manejar redirecciones
    const router = useRouter();
    // Obtenemos los parámetros de consulta de la URL
    const searchParams = useSearchParams();

    // useRef para rastrear si el efecto ya se ejecutó
    const effectRan = useRef(false);

    // useEffect para manejar el flujo de autenticación social
    useEffect(() => {
        // Obtenemos los parámetros 'state' y 'code' de la URL
        const state = searchParams.get('state'); // 'state' es usado para prevenir ataques CSRF
        const code = searchParams.get('code'); // 'code' es el código de autorización devuelto por el proveedor

        // Verificamos si ambos parámetros están presentes y si el efecto no se ha ejecutado antes
        if (state && code && !effectRan.current) {
            // Llamamos a la función de autenticación con los datos necesarios
            authenticate({ provider, state, code })
                .unwrap() // Desempaquetamos la respuesta
                .then(() => {
                    // Si la autenticación es exitosa:
                    dispatch(setAuth()); // Actualizamos el estado de autenticación en Redux
                    toast.success('Logged in'); // Mostramos un mensaje de éxito
                    router.push('/dashboard'); // Redirigimos al usuario al dashboard
                })
                .catch(() => {
                    // Si la autenticación falla:
                    toast.error('Failed to log in'); // Mostramos un mensaje de error
                    router.push('/auth/login'); // Redirigimos al usuario a la página de inicio de sesión
                });
        }

        // Cleanup function: marcamos que el efecto ya se ejecutó
        return () => {
            effectRan.current = true; // Esto evita que el efecto se ejecute nuevamente
        };
    }, [authenticate, provider]); // Dependencias del efecto: se ejecutará si cambian 'authenticate' o 'provider'
}