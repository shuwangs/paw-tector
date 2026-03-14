import React, { useEffect, useState, useContext } from "react";
import {Link, useParams} from 'react-router-dom';
import {getAnimalHistory, getAnimalStats} from '../api/animalApi.js'
import { capitalize, getAnimalEmoji } from "../utils/helper.js";
import { useCurrentUser } from "../context/CurrentUserContext.jsx";
import { IoMdArrowRoundBack } from "react-icons/io";
import './AnimalProfilePage.css'

const AnimalProfilePage = () => {
    const [history, setHistory] = useState(null);
    const [animalStats, setAnimalStats] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const animalId = useParams().individualId;

    // const fetchAnimalHistory = async (animalId) =>{
    //     setError(null);
    //     setLoading(true);
    //     try {
    //         const animalHistory = await getAnimalHistory(animalId);
    //         console.log("fetch animal History: ", animalHistory)
    //         setHistory(animalHistory);
    //     } catch(err) {

    //         setError(err.message || "Unknown error");
    //     }finally{
    //         setLoading(false);
    //     }
    // }


    // const fetchAnimalStats = async (animalId) =>{
    //     setError(null);
    //     setLoading(true);
    //     try {
    //         const stats = await getAnimalStats(animalId);
    //         console.log("fetch animal Stats: ", stats)
    //         setAnimalStats(stats);
    //     } catch(err) {

    //         setError(err.message || "Unknown error");
    //     }finally{
    //         setLoading(false);
    //     }
    // }

    useEffect(() =>{
        const fetchAnimalData = async()=> {
            setLoading (true);
            setError(null);
        
            try {
                const  [animalHistory, stats] = await Promise.all([
                    getAnimalHistory(animalId),
                    getAnimalStats(animalId),
                ]);
                setHistory(animalHistory);
                setAnimalStats(stats);

            } catch (err) {
                setError(err.message || "Unknown error");
            } finally {
                setLoading(false);
            }
        }

        fetchAnimalData();

    }, [animalId])

    if (loading) {
        return <p>Loading animal profile...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!history || !history.animalInfo || history.animalInfo.length === 0) {
        return <p>No animal data found.</p>;
    }

    const animal = history.animalInfo[0];
    return(
        <div className="animal-profile-page">
            <Link to="/records" className="back-link"><IoMdArrowRoundBack /> Back</Link>
            <div className="profile-card">
                <div className="name-row">
                    <div className="animal-name"> {animal.nickname}</div>
                    <div className="animal-color">Color: {animal.color}</div>
                </div>

                <div className="profile-breed">
                    <div className="animal-info"> {animal.breed_name ?? ""}</div>
                    <div className="animal-info">{capitalize(animal.age_group) ?? "Unknown"}</div>
                </div>

                <div className="profile-stats-grid">
                        <div className="stat-card">
                        <p className="stat-label">Last Seen</p>
                        <p className="stat-value">🕧 {new Date(animalStats.last_sighting).toLocaleString() }</p>
                    </div>

                    <div className="stat-card">
                    <p className="stat-label">Total Sightings</p>
                    <p className="stat-value">👀 {animalStats.sightings_count} time{animalStats.sightings_count > 1 ? "s" : ""}</p>
                    </div>
                </div>
                <div className="profile-description">
                    <div className="animal-seen">Description: {animal.description}</div>
                </div>
            </div>

            <div className="timeline-section">
                <h2 className="timeline-title">📅 Sighting Timeline</h2>

                <div className="timeline-list">
                    {history.sightedHistory.map((rec, index) => (
                    <div
                        className="timeline-item"
                        key={rec.sighting_id || rec.id || index}
                    >
                        <div className="timeline-number">
                        {history.sightedHistory.length - index}
                        </div>

                        <div className="timeline-card">
                        <div className="timeline-left">
                            <div className="timeline-date">
                            {new Date(rec.sighted_at).toLocaleString()}
                            </div>

                            <div className="timeline-location">
                            📍 {rec.address || "Unknown Area"}
                            </div>
                        </div>

                        <div className={`timeline-status ${rec.health_status}`}>
                            {rec.health_status === "healthy" && "💚"}
                            {rec.health_status === "injured" && "🤕"}
                            {rec.health_status === "sick" && "😷"}
                            {rec.health_status === "unknown" && "❔"}
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AnimalProfilePage;