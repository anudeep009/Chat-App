import React, { createContext, useState, ReactNode, useEffect } from 'react';

interface UserType {
    username: string;
    profileImage: string;
    id: string;
    token?: string;
}

interface UserContextType {
    userLoggedIn: boolean;
    setUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    user: UserType;
    setUser: React.Dispatch<React.SetStateAction<UserType>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserContextProviderProps {
    children: ReactNode;
}

function UserContextProvider({ children }: UserContextProviderProps) {
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [user, setUser] = useState<UserType>({
        username: "",
        profileImage: "",
        id: "",
        token: undefined,
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (token && storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser({
                    username: parsedUser.username,
                    profileImage: parsedUser.profileImage,
                    id: parsedUser._id,
                    token: token,
                });
                setUserLoggedIn(true);
            } catch (error) {
                console.error("Failed to parse user data from localStorage", error);
            }
        }
    }, []);

    return (
        <UserContext.Provider value={{ userLoggedIn, setUserLoggedIn, user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserContextProvider };
