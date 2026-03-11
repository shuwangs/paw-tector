import React, { useEffect, useState } from "react";
import {Link, useParams} from 'react-router-dom';
import {getAnimalHistory, getAnimalStats} from '../api/animalApi.js'
import { capitalize, getAnimalEmoji } from "../utils/helper.js";
import { IoMdArrowRoundBack } from "react-icons/io";
import './AnimalProfilePage.css'

const AnimalProfilePage = () => {
    const [history, setHistory] = useState(null);
    const [animalStats, setAnimalStats] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const animalId = useParams().individualId;

    const fetchAnimalHistory = async (animalId) =>{
        setError(null);
        setLoading(true);
        try {
            const animalHistory = await getAnimalHistory(animalId);
            console.log("fetch animal History: ", animalHistory)
            setHistory(animalHistory);
        } catch(err) {

            setError(err.message || "Unknown error");
        }finally{
            setLoading(false);
        }
    }


    const fetchAnimalStats = async (animalId) =>{
        setError(null);
        setLoading(true);
        try {
            const stats = await getAnimalStats(animalId);
            console.log("fetch animal Stats: ", stats)
            setAnimalStats(stats);
        } catch(err) {

            setError(err.message || "Unknown error");
        }finally{
            setLoading(false);
        }
    }

    useEffect(() =>{
        console.log(animalId)
        fetchAnimalHistory(animalId);
        fetchAnimalStats(animalId);
        console.log("history :", history);
        console.log("stats :", animalStats);

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
            <Link to="/records" className="back-link"><IoMdArrowRoundBack /> back</Link>
            <div className="profile-header">
                <div className="profile-name">
                    <div className="animal-name"> {animal.nickname}</div>
                    <div className="animal-color">{animal.color}</div>
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
                <div className="profile-stats">
                    <div className="animal-seen">Description: {animal.description}</div>
                </div>
            </div>

            <div className="history">
                <h2>📅 Sighting Timeline</h2>
                <div className="history-ctn">
                    {history.sightedHistory.map((rec)=> {
                        return (
                            <div className="record">
                                <div className="rec-status">
                                    <div> {new Date(rec.sighted_at).toLocaleString()} </div>
                                    <div> {rec.health_status} </div>
                                </div>
                                <div className="sighted-location">
                                    <div> {rec.address} </div> 
                                    <div> {rec.state} </div> 
                                    <div>{rec.zipcode}</div>
                                </div>
                            </div>

                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default AnimalProfilePage;