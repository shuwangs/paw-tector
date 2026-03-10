import React, { useEffect, useState } from "react";
import {Link, useParams} from 'react-router-dom';
import {getAnimalHistory} from '../api/animalApi.js';
import { IoMdArrowRoundBack } from "react-icons/io";


const AnimalProfilePage = () => {
    const [history, setHistory] = useState(null);
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
    useEffect(() =>{
        console.log(animalId)
        fetchAnimalHistory(animalId);
        console.log("history :", history);

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
                    <div className="animal-info"> {history.is_sterilized ? "Neutered" :""}</div>
                    <div className="animal-info">{history.is_stray ? "Stray" : "Owned"}</div>
                </div>
                <div className="profile-stats">
                    <div className="animal-seen"> {history.is_sterilized ? "Neutered" :""}</div>
                    <div className="animal-seen">{history.is_stray ? "Stray" : "Owned"}</div>
                </div>
                <div className="profile-stats">
                    <div className="animal-seen"> {history.description}</div>
                </div>
            </div>

            <div className="history">
                <h2>📅 Sighting Timeline</h2>
                <div className="history-ctn">
                    {history.sightedHistory.map((rec)=> {
                        return (
                            <div className="record">
                                <div className="rec-status">
                                    <div> {rec.sighted_at} </div>
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