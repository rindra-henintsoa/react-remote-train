import axios from "axios";
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const login = async (username, password) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_ROOT}/jwt-auth/v1/token`,
                {username, password}
            );

            setToken(response.data.token);
            console.log(response.data);
            setUser({
                name: response.data.user_display_name,
                email: response.data.user_email,
            })

        } catch (error) {
            return {success: false, message: "Identifiants incorrects"}
        }

    }

    const logout = () => {
        setUser(null);
        setToken(null)
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}