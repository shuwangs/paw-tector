import React , {useState, useContext}from "react";

import { useCurrentUser } from "../context/CurrentUserContext";
import SightingForm from "./SightingForm";
const SightingModal = ({ onClose }) => {

    const {trackedAnimals} = useCurrentUser();
    const [mode, setMode] = useState("select");
    const [selectedAnimal, setSelectedAnimal] = useState(null);

    const handleSelectAnimal = (animal) => {
        setSelectedAnimal(animal);
        setMode("existing");
    };

    const handleAddNewAnimal = () => {
        setSelectedAnimal(null);
        setMode("new");
    }

     const handleBack = () => {
        setSelectedAnimal(null);
        setMode("select");
    }


    return(
    <div className="sighting-modal-overlay" onClick={onClose} >
        <div className="sighting-modal-header"
            onClick={(e) => e.stopPropagation()}>
        {mode === "select" &&
         <>

                <h2>Select Animal</h2>
                <button
                        type="button"
                        className="close-btn"
                        onClick={onClose}
                    >
                        ×
                </button>
                <div className="divider" />
                    <p>Tracked Animals:</p>
                    <div className="animal-list">
                        {trackedAnimals.map((animal) => (
                            <button
                            key={animal.id}
                            type="button"
                            className="animal-card"
                            onClick={() => handleSelectAnimal(animal)}
                            >
                                <div>
                                    <div className="name">{animal.nickname}</div>
                                    <div className="species">{animal.species}</div>
                                </div>
                            </button>
                        ))}
                </div>

                <button
                    type="button"
                    className="add-new-animal-btn"
                    onClick={handleAddNewAnimal}

                    >
                        + Add New Animal
                </button>
            </>
        }
        {(mode === "existing" || mode === "new") && (
          <SightingForm
            mode={mode}
            selectedAnimal={selectedAnimal}
            onClose={onClose}
            onBack={handleBack}
          />
        )}
    </div>
    </div>
    )
}

export default SightingModal;