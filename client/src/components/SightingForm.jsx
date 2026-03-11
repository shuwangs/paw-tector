import React,{ useContext, useEffect, useState } from "react";
import { createAnimalWithSighting, addNewSightingToExistingAnimal } from "../api/sightingsApi";
import { useCurrentUser } from "../context/CurrentUserContext";
import { getAnimalEmoji } from "../utils/helper.js";
import useForm from '../utils/useForm.js';
import './SightingForm.css'
const SightingForm = ({onClose, mode, selectedAnimal}) => {
    // TODOS
    // if the animal is in the db, add sightings only
    console.log("selected animal is: ", selectedAnimal);
    const {currentUserId, setTrackedAnimals} = useCurrentUser();

    const initialForm = {
        nickname: "",
        species: "",
        breed: "",
        color: "",
        age_group: "unknown",
        is_sterilized: false,
        is_stray: true,
        // Sighting 
        location: "",
        health_status: "healthy",
        sighted_at: "",
        notes: ""
    }


    const [formData, setFormData, handleChange, handleCheckboxChange, resetForm, handleClearForm, handleHealthStatus] = useForm(initialForm);

    console.log(mode);

    const handleSubmitForm = async (e) => {  
        e.preventDefault();
        try {
            if (mode == "new") {
                const newAnimal = await createAnimalWithSighting(currentUserId, formData);
                console.log(newAnimal);
                onClose();
                setTrackedAnimals(prev => [...prev, newAnimal]);    
            } else if (mode === "existing") {
                console.log(mode);
                const payload = {
                    // user_id: currentUserId,
                    individual_id: selectedAnimal.individual_id,
                    address: formData.location,
                    health_status: formData.health_status,
                    sighted_at: formData.sighted_at,
                    notes: formData.notes,
                };
                const newSighting = await addNewSightingToExistingAnimal(currentUserId, payload);
                console.log(newSighting);
                onClose();

            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form onSubmit={handleSubmitForm}>
            {
            mode==="new" && <div className="mode-new">
                <div className="modal-title">
                    <h1>Add New Animal 🐾</h1>
                    <button type="button" onClick={onClose}> x</button>
                </div>

                <div className="nickname-ctn">
                    <label>
                        NickName*
                        <input type="text" name="nickname" value={formData.nickname} onChange={handleChange}/>
                    </label>
                </div>

                <div className="breed-ctn">
                    <label>
                        Species*
                        <select name="species" value={formData.species}  onChange={handleChange}>
                            <option value="">Select...</option>
                            <option value="Cat">Cat</option>
                            <option value="Dog">Dog</option>
                            <option value="Rabbit">Rabbit</option>
                            <option value="Raccoon">Raccoon</option>
                            <option value="Others">Other</option>
                        </select>
                    </label>
                    <label >
                        Breed
                        <input name="breed" value={formData.breed} onChange={handleChange} type="text" placeholder="Optional"  />
                    </label>
                </div>

                <div className="color-ctn">
                    <label>
                        Age*
                        <select name="age_group" value={formData.age_group}  onChange={handleChange}>
                            <option value="unknown">Unknown</option>
                            <option value="baby">Babe</option>
                            <option value="young">Young</option>
                            <option value="adult">Adult</option>
                            <option value="senior">Senior</option>
                        </select>
                    </label>
                    <label >
                        Color
                        <input value={formData.color} onChange={handleChange} name="color" type="text" placeholder="Optional"  />
                    </label>
                </div>


                <div className="stray-ctn">
                    <label>
                        Sterilized
                        <input
                            type="checkbox"
                            name="is_sterilized"
                            checked={formData.is_sterilized}
                            onChange={handleCheckboxChange}
                        />
                    </label>

                    <label>
                        Is Stray
                        <input
                            type="checkbox"
                            name="is_stray"
                            checked={formData.is_stray}
                            onChange={handleCheckboxChange}
                        />
                    </label>
                </div>

                </div>
            }

            {/* choose to add sightings to existing animals */}
            {mode === "existing" &&            
             <div className="mode-existing">
                <div>
                    <div className="add-header"> 
                        <div className="animal-icon">{getAnimalEmoji(selectedAnimal.animal_type)} </div>
                        <div><h2>{selectedAnimal.nickname}</h2></div>
                        <button type="button" onClick={onClose}> x</button>
                    </div>
                </div>
            </div>}


            <div className="modal-content">

                <div className="found-details">
                 
                        <label>
                            Location*
                            <input type="text" name="location" value={formData.location} onChange={handleChange} />
                        </label>
       
                        <label>
                            Sighted at*
                            <input name="sighted_at" type="datetime-local" value={formData.sighted_at} onChange={handleChange} />
                        </label>
       
                </div>
                <div>
               
                    <button type="button" onClick={()=>{handleHealthStatus('healthy')}}>Healthy</button>
                    <button type="button" onClick={()=>{handleHealthStatus('sick')}}>Sick</button>
                    <button type="button" onClick={()=>{handleHealthStatus('injured')}}>Injured</button>
                    <button type="button" onClick={()=>{handleHealthStatus('unknown')}}>Unknown</button>

                </div>
                
                <div>
                    <textarea
                        name="notes" 
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Notes: anything about this animal (Optional)"
                    />
                </div>

            </div>
            {   mode === "new" &&
                <div className="btn-group">            
                    <button className="primary-btn" type="submit">Create Animal & Add Sighting</button>
                    <button className="secondary-btn" type="button" onClick={handleClearForm}>Cancel</button>
                </div>
            }    

            {   mode === "existing" &&
                <div className="btn-group">            
                    <button className="primary-btn" type="submit">Add New Sighting</button>
                    <button className="secondary-btn" type="button" onClick={handleClearForm}>Cancel</button>
                </div>
            }    
        </form>
    )
}

export default SightingForm;