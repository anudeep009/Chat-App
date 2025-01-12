import React, { createContext, useState, ReactNode, useEffect } from 'react';

interface UserType {
    username: string;
    profileImage: string;
    id: string;
    token?: string;
}

interface SelectedChatType {
    _id : string;  //user id not chat id
    username: string;
    profileImage: string;
    chat? : string[];
}

interface UserContextType {
    userLoggedIn: boolean;
    setUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    user: UserType;
    setUser: React.Dispatch<React.SetStateAction<UserType>>;
    selectedChat: SelectedChatType;
    setSelectedChat: React.Dispatch<React.SetStateAction<SelectedChatType>>;
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
    });
    const [selectedChat, setSelectedChat] = useState<SelectedChatType>({
        _id : "",
        username: "",
        profileImage: "",
        chat: [],
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (token && storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser({
                    username: parsedUser.username || "",
                    profileImage: parsedUser.profileImage || "",
                    id: parsedUser._id || "",
                    token,
                });
                setUserLoggedIn(true);
            } catch (error) {
                console.error("Failed to parse user data from localStorage", error);
            }
        }
    }, []);

    return (
        <UserContext.Provider
            value={{
                userLoggedIn,
                setUserLoggedIn,
                user,
                setUser,
                selectedChat,
                setSelectedChat,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserContextProvider };
