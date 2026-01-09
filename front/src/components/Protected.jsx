import axios from "axios";
import { useEffect, useState } from "react";


function Protected({token}){
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios
        .get("http://localhost:5001/api/auth/protected", {headers: {Authorization: `Bearer ${token}`}})
        .then(res => setMessage(res.data.message))
        .catch(() => setMessage('Access denied'));
    }, [token]);

    return <p>{message}</p>
}

export default Protected;