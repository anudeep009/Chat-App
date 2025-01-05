import React, { createContext, useState, ReactNode } from 'react';

interface UserType {
    username: string;
    profileImage: string;
    id: string;
    token : string;
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
    const [user, setUser] = useState<UserType>({ username: "", profileImage: "", id: "", token : "" });

    return (
        <UserContext.Provider value={{ userLoggedIn, setUserLoggedIn, user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserContextProvider };
