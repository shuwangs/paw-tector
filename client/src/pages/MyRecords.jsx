import React,{useState, useEffect} from "react";
import { getUsers } from "../api/userApi.js";
import '../App.css';
import { useRoutes } from "react-router-dom";
const MyRecords = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() =>{
        const loadUsers = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await getUsers();
                setUsers(res);
            } catch(err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        loadUsers();

    },[])

    return (
        <div>
            <div>This is the user records page</div>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            <div className='total-user'>
                <option>User List</option>
                <select>
                    {users.map((u) => (
                        <option key={u.id}>{u.user_name}</option>
                    ))}
                </select>
            </div>
        
        
        </div>

    )
}

export default MyRecords;