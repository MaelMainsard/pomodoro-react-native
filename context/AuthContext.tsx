import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { SignInWithGoogleResponse, signInWithGoogleSilently, SignInWithGoogleResTypes } from "@/hooks/useGoogleAuth";

interface AuthContextType {
    userInfo: SignInWithGoogleResponse | null;
    isLoading: boolean;
    setUserInfo: (userInfo: SignInWithGoogleResponse | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [userInfo, setUserInfo] = useState<SignInWithGoogleResponse | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {

        const signInSilently = async () => {
            const response = await signInWithGoogleSilently();
            if (response.type === SignInWithGoogleResTypes.LOGIN_SILENT_SUCCESS) {
                setUserInfo(response);
            }
            setIsLoading(false);
        };

        signInSilently();
    }, []);

    return (
        <AuthContext.Provider value={{ userInfo, setUserInfo, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
