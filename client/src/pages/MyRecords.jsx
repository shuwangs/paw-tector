import React,{useState, useEffect} from "react";
import { getUsers } from "../api/userApi.js";
import { useRoutes } from "react-router-dom";
import { useCurrentUser } from "../context/CurrentUserContext.jsx";
import RecordAnimalsList from "../components/RecordAnimalsList.jsx";
import '../App.css';

const MyRecords = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { currentUserId, setCurrentUserId} = useCurrentUser();
    
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
                <select value={currentUserId || ""}
                    onChange={(e) => setCurrentUserId(e.target.value)}>
                    {users.map((u) => (
                        <option key={u.id} value={u.id}>{u.user_name}</option>
                    ))}
                </select>
            </div>

            <div className="current-user-stats">
                <div className="curr-stats-header">
                    <h1>My Volunteer Records</h1>

                </div>

                <div className="my-stats">
                    <div className="stats-ctn">
                        <p>0</p>
                        <p>Total Sighints</p>

                    </div>

                    <div className="stats-ctn">
                        <p>0</p>
                        <p>Total Animals</p>
                    </div>

                    <div className="stats-ctn">
                        <p>0</p>
                        <p>Locations</p>
                    </div>

                </div>
                
            </div>

            <div className="my-records display">
                <RecordAnimalsList />

            </div>
        
        </div>

    )
}

export default MyRecords;