import React,{useState, useEffect} from "react";
import { useRoutes } from "react-router-dom";
import { useCurrentUser } from "../context/CurrentUserContext.jsx";
import RecordAnimalsList from "../components/RecordAnimalsList.jsx";
import '../App.css';
import './MyRecords.css';

const MyRecords = () => {
    const {users, currentUserId, setCurrentUserId, currentUserStats, loading, error} = useCurrentUser();

    return (
        <div className="my-record-page">
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            <div className='total-user'>
                <label>Volunteer List</label>

                <select value={currentUserId || ""}
                    onChange={(e) => setCurrentUserId(e.target.value)}>
                    <option value={currentUserId || ""}>Volunteers</option>
                    
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
                    <div className="record-stat-card">
                        <p>{currentUserStats.total_sightings}</p>
                        <p>Total Sightings</p>

                    </div>

                    <div className="record-stat-card">
                        <p>{currentUserStats.animals_tracked}</p>
                        <p>Total Animals</p>
                    </div>

                    <div className="record-stat-card">
                        <p>{currentUserStats.locations} </p>
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