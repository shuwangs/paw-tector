
import React,{useContext,useState, useEffect} from 'react';
import useForm from '../utils/useForm.js';
import {updateTrackedAnimal} from '../api/userApi.js';
import { useCurrentUser } from "../context/CurrentUserContext.jsx";

const EditAnimalForm = ({onClose, editingAnimal, }) => {
    // const initialForm = editingAnimal;
    const [
        formData,
        setFormData,
        handleChange,
        handleCheckboxChange,
        resetForm,
        handleClearForm,
        handleHealthStatus
        ] = useForm(editingAnimal.animal);

    const {currentUserId, getTrackedAnimals, fetchTrackedAnimals, trackedAnimals, setTrackedAnimals} = useCurrentUser();

    useEffect(() => {
        console.log(editingAnimal);
        console.log("formData: ", formData);
    }, [editingAnimal]);

    useEffect(() => {
        setFormData(editingAnimal.animal);
    }, [editingAnimal, setFormData]);

    const handleSubmitEditForm =  async (e) => {
        e.preventDefault();

        try {
            const payload = {
                 ...formData,
                is_sterilized: formData.is_sterilized ?? false,
                is_stray: formData.is_stray ?? true
            }
            const updatedAnimal = await updateTrackedAnimal(currentUserId, formData.individual_id, payload);
            console.log("updated animal:", updatedAnimal);
            
            await getTrackedAnimals(currentUserId);
            onClose();
        } catch(err) {
            console.error("edit animal form submission error:", err);
        }
    }

    
    return (
        <form onSubmit={handleSubmitEditForm}>
        <div className="mode-new">
            <div className="modal-title">
                <h1>Update {editingAnimal.animal.nickname} 🐾</h1>
                <button type="button" onClick={onClose}> x</button>
            </div>

            <div className="nickname-ctn">
                <label>
                    NickName*
                    <input type="text" name="nickname" value={formData.nickname || ""} onChange={handleChange} />
                </label>
            </div>
            <div className="breed-ctn">
                <label>
                    Species*
                    <select name="species" value={formData.species || ""} onChange={handleChange}>
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
                    <input name="breed" value={formData.breed ||""} onChange={handleChange} type="text" placeholder="Optional" />
                </label>
            </div>

            <div className="color-ctn">
                <label>
                    Age*
                    <select name="age_group" value={formData.age_group || "unknown"} onChange={handleChange}>
                        <option value="unknown">Unknown</option>
                        <option value="baby">Babe</option>
                        <option value="young">Young</option>
                        <option value="adult">Adult</option>
                        <option value="senior">Senior</option>
                    </select>
                </label>
                <label >
                    Color
                    <input value={formData.color || ""} onChange={handleChange} name="color" type="text" placeholder="Optional" />
                </label>
            </div>
            <div className="stray-ctn">
                <label>
                    Sterilized
                    <input
                        type="checkbox"
                        name="is_sterilized"
                        checked={!!formData.is_sterilized}
                        onChange={handleCheckboxChange}
                    />
                </label>

                <label>
                    Is Stray
                    <input
                        type="checkbox"
                        name="is_stray"
                        checked={!!formData.is_stray}
                        onChange={handleCheckboxChange}
                    />
                </label>
            </div>

            <div className="btn-group">
                <button className="primary-btn" type="submit">Save</button>
                <button className="secondary-btn" type="button" onClick={onClose}>Cancel</button>
            </div>
        </div> 
        </form>

    )
}

export default EditAnimalForm;