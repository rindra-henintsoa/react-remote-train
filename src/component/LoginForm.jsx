import { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";

const LoginForm = () => {
    const { login, user, logout } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await login(username, password);
        console.log(res);
        if (!res.success) {
            setError(res.message);
        }
    }

    if ( user ) {
        return (
            <>
                <p>Vous êtes connecté(e) 👋 {user.name} </p> 
                <button onClick={() => logout()}>Se déconnecter</button>
            </>
        )
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Connexion</h3>

            { error &&  <p style={{ color: "red" }}>{error}</p>}

            <input 
                type="text" 
                placeholder="Nom d'utilisateur"
                value={username}
                onChange={(e) => setUsername(e.target.value)} 
            />

            <input 
                type="text" 
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
            />

            <button type="submit">Se connecter</button>
        </form>
    )
}   

export default LoginForm;