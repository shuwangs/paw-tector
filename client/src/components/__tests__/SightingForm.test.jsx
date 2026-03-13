import React from 'react';
import {render, screen, fireEvent, waitForm} from '@testing-library/react';
import {describe, test, expect, beforeEach, vi} from 'vitest';
import SightingForm from '../SightingForm';
import { getAnimalEmoji } from '../../utils/helper';

// Mock the dependencies
vi.mock("../../api/sightingsApi", () => {
    createAnimalWithSighting: vi.fn(),
    addNewSightingToExistingAnimal: vi.fn(),
})

// Mock the userContext
vi.mock("../../context/CurrentUserContext", () => {
    useCurrentUser: vi.fn();
})

vi.mock('../../utitls/helper.js', () =>{
    getAnimalEmoji: vi.fn(() => "LOL");
})

import {
  createAnimalWithSighting, addNewSightingToExistingAnimal} from "../../api/sightingsApi";
import { useCurrentUser } from "../../context/CurrentUserContext";

describe("<Sighting form testing>", () =>{
    const mockOnClose = vi.fn();
    const mockSetTrackedAnimals = vi.fn();

    beforeEach(() =>{
        vi.clearAllMock();

        useCurrentUser.mockReturnValue({
            currentUserId:1,
            setTrackedAnimals: mockSetTrackedAnimals,
        })
    }

    test("renders new mode form fields", () => {
        render(<SightingForm onClose ={mockOnClose} mode="new" selectedAnimal={null} />)

        expect(screen.getByText(/add new animal/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/NickName/i)).toBeInTheDocument();
        expect(screen.getByRole("button", {name: /Create Animal & add sighting/i})).toBeInTheDocument();
    })


)
})