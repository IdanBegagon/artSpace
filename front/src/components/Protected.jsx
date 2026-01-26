import axios from "axios";
import { useEffect, useState } from "react";
import api from "../api.jsx";


function Protected({ token }) {
    const [message, setMessage] = useState('');

    useEffect(() => {
        api
            .get("/api/auth/protected", { headers: { Authorization: `Bearer ${token}` } })
            .then(res => setMessage(res.data.message))
            .catch(() => setMessage('Access denied'));
    }, [token]);

    return <p>{message}</p>
}

export default Protected;