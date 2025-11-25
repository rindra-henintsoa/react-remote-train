import { useState, useEffect } from "react";
import axios from 'axios';
export default function useFetch(url, options = []) {
    const [loading, setloading] = useState(true)
    const [posts, setPosts] = useState([]);
    const [errors, setErrors] = useState(null)
    
        useEffect(() => {
            axios.get(url)
                .then((res) => {
                    setPosts(res.data);
                })
                .catch((error) => {
                    setErrors(error);
                })
                .finally(() => {
                    setloading(false);
                });
        }, []);

    return {
        loading, posts, errors
    }
}