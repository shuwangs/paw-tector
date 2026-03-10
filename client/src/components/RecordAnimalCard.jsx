import React, { useState } from "react";
import {Link} from 'react-router-dom';
import { useCurrentUser } from "../context/CurrentUserContext";

import "./DisplayCard.css";
import EditAnimalForm from "./EditAnimalForm";

const RecordAnimalCard = ({animal}) => {
    const navigate = useNavigate();

    const { currentUserId, deleteTrackedAnimal, fetchTrackedAnimals} = useCurrentUser();
    const [editingAnimal, setEditingAnimal] = useState(null);
    const [showEditingForm, setShowEditingForm] = useState(false);
    const handleDelete = async () => {
        try {
            await deleteTrackedAnimal(currentUserId, animal.individual_id);
            await fetchTrackedAnimals(currentUserId);
        } catch (err) {
            console.error("delete animal error:", err);
        }
    };
    const handleEdit = () =>{
        setShowEditingForm(true);
        setEditingAnimal({animal});
    }
    // const handleView = () => {
    //     navigate(`/individuals/${animal.individual_id}`);

    // }

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
                    <Link to ={`/individuals/${animal.individual_id}`} className="view-animal-link">

                        <button>👁️</button>
                    </Link>
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