import React, { useState } from "react";
import {Link} from 'react-router-dom';
import { useCurrentUser } from "../context/CurrentUserContext";
import EditAnimalForm from "./EditAnimalForm";
import {getAnimalEmoji, capitalize} from '../utils/helper.js';
import "./DisplayCard.css";

const RecordAnimalCard = ({animal}) => {
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
                <div className="animal-card-left">
                    <div className="animal-icon">{getAnimalEmoji(animal.animal_type.toLowerCase())}</div>
                    <div className="animal-details">
                        <div className="name-ctn">
                            <div className="name-area">{animal.nickname}</div>
                            <div className={`status-ctn ${animal.health_status}`} >{animal.health_status}</div>
                        </div>
                        <div className="type-ctn">
                            <div className="species">{animal.animal_type}  {animal.breed_name ? ` • ${animal.breed_name}` : ""}</div>
                            <div className="location"><span className="age-icon">Age: </span> {capitalize(animal.age_group)}</div>
                        </div>
      
                    </div>
                </div>
       


                <div className='record-btn-groups'>
                    <Link to ={`/individuals/${animal.individual_id}`} className="view-animal-link">

                        <button className="record-btn">👀</button>
                    </Link>
                    <button className="record-btn" onClick={handleEdit}>✏️</button>
                    <button className="record-btn" onClick={handleDelete}>🗑️</button>
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