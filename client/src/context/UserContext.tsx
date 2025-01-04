import React, { createContext, useState, ReactNode } from 'react';

interface UserContextType {
    userLoggedIn: boolean;
    setUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    user : {
        username: string;
        profileImage: string;
        id : string;
    }
}

const UserContext = createContext<UserContextType | undefined>({
    userLoggedIn: false,
    setUserLoggedIn: () => {},
    user: {
        username: "",
        profileImage: "",
        id: ""
    }   
});

interface UserContextProviderProps {
    children: ReactNode;
}

function UserContextProvider({ children }: UserContextProviderProps) {
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    return (
        <UserContext.Provider value={{ userLoggedIn, setUserLoggedIn, user: { username: "", profileImage: "", id: "" } }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserContextProvider };