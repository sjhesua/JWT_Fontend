'use client';

import { createContext, useContext, useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
}

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    isRefreshingToken: boolean;
    setIsRefreshingToken: (isRefreshing: boolean) => void;
   
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isRefreshingToken, setIsRefreshingToken] = useState<boolean>(false);
    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                isLoggedIn,
                setIsLoggedIn,
                isRefreshingToken,
                setIsRefreshingToken,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error('useUser debe usarse dentro de un UserProvider');
    return context;
};