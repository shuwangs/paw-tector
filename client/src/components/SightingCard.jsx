import React from "react";
import {getAnimalEmoji} from '../utils/helper.js';
import './DisplayCard.css';

const SightingCard = ({sighting}) => {

    return (
        <div className="sighting-card">
            <div className="species-icon">{getAnimalEmoji(sighting.animal_type.toLowerCase())}</div>
            <div className="sighting-details">
                <div className="details-top">
                    {/* TODO Replace with animalName */}
                    <div className="name-ctn">{sighting.id}</div>
                    <div className="name-ctn">{sighting.nickname}</div>

                    <div className={`status-ctn ${sighting.health_status}`} >{sighting.health_status}</div>
                </div>

                 {/* TODO add with animalName */}
                <div className="species">AnimalType • {sighting.breed_name}</div>
                <div className="location"><span className="location-icon">📍</span> {sighting.address}</div>
                <div className="sighting-time">{sighting.sighted_at}</div>
            </div>

        </div>
    )
}

export default SightingCard;