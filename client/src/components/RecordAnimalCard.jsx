import React from "react";
import "./DisplayCard.css";

const RecordAnimalCard = ({animal}) => {
    return (
        <div className="animal-card">
            <div className="animal-icon">Cat</div>
            <div className="animal-details">
                <div className="name-ctn">{animal.name}</div>
                <div className="status-ctn">{animal.health_status}</div>
                <div className="species">{animal.animal_type} • {animal.breed_name}</div>
                <div className="location"><span className="location-icon">📍</span> {animal.address}</div>
            </div>

            <div className='btn-ctn'>
                <button>👁️</button>
                <button>✏️</button>
                <button>🗑️</button>
            </div>

        </div>
    )
};

export default RecordAnimalCard;