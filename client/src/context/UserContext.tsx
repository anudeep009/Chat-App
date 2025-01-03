import React, { createContext, useState, ReactNode } from 'react';

interface UserContextType {
    userLoggedIn: boolean;
    setUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserContext = createContext<UserContextType | undefined>({
    userLoggedIn: false,
    setUserLoggedIn: () => {},
});

interface UserContextProviderProps {
    children: ReactNode;
}

function UserContextProvider({ children }: UserContextProviderProps) {
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    return (
        <UserContext.Provider value={{ userLoggedIn, setUserLoggedIn }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserContextProvider };