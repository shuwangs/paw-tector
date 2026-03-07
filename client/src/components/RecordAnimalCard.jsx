import React, { useState } from "react";
import { useCurrentUser } from "../context/CurrentUserContext";

import "./DisplayCard.css";
import EditAnimalForm from "./EditAnimalForm";

const RecordAnimalCard = ({animal}) => {
    const { currentUserId, deleteTrackedAnimal} = useCurrentUser();
    const [editingAnimal, setEditingAnimal] = useState(null);
    const [showEditingForm, setShowEditingForm] = useState(false);
    const handleDelete = () => {
        deleteTrackedAnimal( currentUserId, animal.individual_id);
    };
    const handleEdit = () =>{
        setShowEditingForm(true);
        setEditingAnimal({animal});
    }


    return (
        <>
            <div className="animal-card">
                <div className="animal-icon">Cat</div>
                <div className="animal-details">
                    <div className="name-ctn">{animal.nickname}</div>
                    <div className="status-ctn">{animal.health_status}</div>
                    <div className="species">{animal.animal_type} • {animal.breed_name}</div>
                    <div className="location"><span className="location-icon">📍</span> {animal.address}</div>
                </div>

                <div className='btn-ctn'>
                    <button>👁️</button>
                    <button onClick={handleEdit}>✏️</button>
                    <button onClick={handleDelete}>🗑️</button>
                </div>

            </div>


            { showEditingForm && 
            (<EditAnimalForm onClose={() =>{setShowEditingForm(false)}}
                editingAnimal={editingAnimal}  />) 
            }
        </>
    )
};

export default RecordAnimalCard;