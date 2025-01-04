import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

function Dashboard() {
    const userContext = useContext(UserContext);
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    const [userLoggedin, setUserLoggedin] = useState(false);

    useEffect(() => {
        if (!userContext) {
            console.error("UserContext is undefined. Ensure it's properly provided.");
            return;
        }

        const { userLoggedIn, user } = userContext;

        if (userLoggedIn) {
            setUsername(user.username);
            setProfilePicture(user.profileImage);
            setUserLoggedin(userLoggedIn);
        } else {
            navigate("/signin");
        }
    }, [userContext, navigate]);

    return (
        <div className="bg-[#1A2238] min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <img src={profilePicture} alt="Profile" className="rounded-full w-24 h-24" />
                <h2 className="text-white text-2xl">{username}</h2>
                <p className="status text-white">{userLoggedin ? "Online" : "Offline"}</p>
            </div>
        </div>
    );
}

export default Dashboard;
