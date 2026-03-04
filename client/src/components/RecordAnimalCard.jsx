import React from "react";

const RecordAnimalCard = () => {
    return (
        <div className="animal">
            <div className="animal-icon">Animal</div>
            <div className="animal-details">
                <div className="status-ctn">name</div>
                <div className="location"><span className="location-icon">📍</span> last-seen</div>
                <div className="sighting-time">dont know what to put yeat</div>
            </div>

            <div className='edit-ctn'>
                <button>👁️</button>
                <button>✏️</button>
                <button>🗑️</button>
            </div>

        </div>
    )
}

export default RecordAnimalCard;