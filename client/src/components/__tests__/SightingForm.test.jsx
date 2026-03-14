import React from 'react';
import {render, screen, fireEvent, waitFor, cleanup} from '@testing-library/react';
import {describe, test, expect, beforeEach, afterEach, vi} from 'vitest';
import '@testing-library/jest-dom/vitest';
import SightingForm from '../SightingForm';
import { getAnimalEmoji } from '../../utils/helper';

// Mock the dependencies
vi.mock("../../api/sightingsApi", () => ({
    createAnimalWithSighting: vi.fn(),
    addNewSightingToExistingAnimal: vi.fn(),
}))

// Mock the userContext
vi.mock("../../context/CurrentUserContext", () => ({
    useCurrentUser: vi.fn(),
}));

vi.mock('../../utils/helper.js', () => ({
    getAnimalEmoji: vi.fn(() => "LOL"),
}))

import {
  createAnimalWithSighting, addNewSightingToExistingAnimal} from "../../api/sightingsApi";
import { useCurrentUser } from "../../context/CurrentUserContext";

describe("<Sighting form testing>", () =>{
    const mockOnClose = vi.fn();
    const mockSetTrackedAnimals = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();

        useCurrentUser.mockReturnValue({
            currentUserId:1,
            setTrackedAnimals: mockSetTrackedAnimals,
        })
    })
    afterEach(() => {
        cleanup();
    });

    test("renders new mode form fields", () => {
        
        render(<SightingForm onClose ={mockOnClose} mode="new" selectedAnimal={null} />)

        expect(screen.getByText(/add new animal/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/NickName/i)).toBeInTheDocument();
        expect(screen.getByRole("button", {name: /Create Animal & Add Sighting/i})).toBeInTheDocument();
    })

    test("submit new animal form and calls createAnimalWithSightings api", async () => {
        const mockNewAnimal = {individual_id: 4, nickname: "A"}
        createAnimalWithSighting.mockResolvedValueOnce(mockNewAnimal);

        render(<SightingForm onClose ={mockOnClose} mode="new" selectedAnimal={null} />)
        fireEvent.change(screen.getByLabelText(/NickName/i), {target: {value: "A", name: "nickname"}});
        fireEvent.change(screen.getByLabelText(/species/i), {
            target: { name: "species", value: "Cat" }
        });

        fireEvent.change(screen.getByLabelText(/location/i), {
            target: { name: "location", value: "DC" }
        });

        fireEvent.change(screen.getByLabelText(/sighted at/i), {
            target: { name: "sighted_at", value: "2026-03-13T12:00" }
        });

        
        fireEvent.click(screen.getByRole("button", {name: /Create Animal & Add Sighting/i}))

        await waitFor(()=> {
            expect(createAnimalWithSighting).toHaveBeenCalledTimes(1);
        })
        expect(createAnimalWithSighting).toHaveBeenCalledWith(1, 
            expect.objectContaining({
                nickname: "A"
            })
        )
        expect(mockOnClose).toHaveBeenCalled();
        expect(mockSetTrackedAnimals).toHaveBeenCalled();

    })

    test ("renders existing mode form fields", () => {
        const mockSelectedAnimal = {
            individual_id: 1,
            nickname: "Bobo",
            animal_type: "Cat",
        };
     
        render(<SightingForm onClose ={mockOnClose} mode="existing" selectedAnimal={mockSelectedAnimal} />)

        expect(screen.getByLabelText(/Location/i)).toBeInTheDocument();
        expect(screen.getByRole("button", {name: /Add New Sighting/i})).toBeInTheDocument();
    })

    test("submit existing animal with new sightings and calls addNewSightingToExistingAnimal api", async () => {
        const mockSelectedAnimal = {
            individual_id: 1,
            nickname: "Bobo",
            animal_type: "Cat",
        };

        const mockNewSighting ={
            id: 11,
            individual_id: 1,
            address: "DC",
            health_status: "healthy",
            sighted_at: "2026-03-13T12:00",
            notes: "looked okay",
        }
        addNewSightingToExistingAnimal.mockResolvedValueOnce(mockNewSighting);

        render(<SightingForm onClose ={mockOnClose} mode="existing" selectedAnimal={mockSelectedAnimal} />)

        fireEvent.change(screen.getByLabelText(/location/i), {
            target: { name: "location", value: "DC" }
        });

        fireEvent.change(screen.getByLabelText(/sighted at/i), {
            target: { name: "sighted_at", value: "2026-03-13T12:00" }
        });

        
        fireEvent.change(screen.getByPlaceholderText(/notes:/i), {
            target: { name: "notes", value: "looked okay" },
        });

        fireEvent.click(screen.getByRole("button", { name: /healthy/i }));
        fireEvent.click(screen.getByRole("button", { name: /add new sighting/i }));

        await waitFor(()=> {
            expect(addNewSightingToExistingAnimal).toHaveBeenCalledTimes(1);
        })
        expect(addNewSightingToExistingAnimal).toHaveBeenCalledWith(1, 
            {
                individual_id: 1,
                address: "DC",
                health_status: "healthy",
                sighted_at: "2026-03-13T12:00",
                notes: "looked okay",
            }
        )
        expect(mockOnClose).toHaveBeenCalled();

    })


    

})
