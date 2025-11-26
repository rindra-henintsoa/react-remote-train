import { useState, useEffect } from "react";
import axios from 'axios';
export default function useFetch(url, options = []) {
    const [loading, setloading] = useState(true)
    const [posts, setPosts] = useState([]);
    const [errors, setErrors] = useState(null);
    const [length, setLength] = useState(null);
    
        useEffect(() => {
            axios.get(url)
                .then((res) => {
                    setPosts(res.data);
                    setLength(res.data.length);
                })
                .catch((error) => {
                    setErrors(error);
                    setLength(0);
                })
                .finally(() => {
                    setloading(false);
                });
        }, []);

    return {
        loading, posts, errors, length
    }
}