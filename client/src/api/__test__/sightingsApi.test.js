import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import { getSightings, getSightingsStats, createAnimalWithSighting, addNewSightingToExistingAnimal, onSearch } from '../sightingsApi.js';

describe("SighgintsAPi", () => {
    beforeEach(() => {
        globalThis.fetch = vi.fn();
    });
    afterEach(() => {
        vi.resetAllMocks();
    });

    test("getSightings: should fetch sightings list successfully", async () => {

        const mockData = {
            data: [{ id: 1, nickname: "Milo" }],
            totalCount: 1,
            page: 1,
            limit: 12,
        };
        globalThis.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockData,
        });

        const result = await getSightings(1);
        expect(globalThis.fetch).toHaveBeenCalledWith("/api/sightings?page=1&limit=12");
        expect(result).toEqual(mockData);
        expect(result.data).toHaveLength(1);
        expect(result.data[0].nickname).toBe("Milo");
    })

    test("getSightings: should throw an error when fetch sightings fails", async () => {
        globalThis.fetch.mockResolvedValueOnce({
            ok: false,
        });

        await expect(getSightings(1)).rejects.toThrow("Failed to fetch sightings");
    });

    test("getSightingsStats: Should fetch sightings stats successfully", async () => {
        const mockStats = {
            animals_tracked: 14,
            total_sightings: 38,
            total_volunteers: 3,
            locations: 37
        };
        globalThis.fetch.mockResolvedValueOnce({
            ok: true,
            json: async() => mockStats
        });
        const result = await getSightingsStats();

        expect(globalThis.fetch).toHaveBeenCalledWith("/api/sightings/stats");
        expect(result).toEqual(mockStats);
        expect(result.animals_tracked).toBe(14);
    })

    test("getSightingsStats: Should throw error when failed", async () => {

        globalThis.fetch.mockResolvedValueOnce({
            ok: false,
        });

        await expect(getSightingsStats()).rejects.toThrow("Failed to get sightings stats");
    })


    test("createAnimalWithSighting: should create animal with sighting successfully", async () => {
        const mockForm = {
            nickname: "Bobo",
            animal_type: "Cat",
            address: "123 Main St",
        };
        const mockResponse = {
            success: true,
            animalId: 101,
        };

        globalThis.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        });

        const result = await createAnimalWithSighting(5, mockForm);
        expect(globalThis.fetch).toHaveBeenCalledWith("/api/users/5/tracked-animals", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(mockForm),
        });

        expect(result).toEqual(mockResponse);

    })
    test("createAnimalWithSighting should throw an error when creating animal fails", async () => {
        globalThis.fetch.mockResolvedValueOnce({
        ok: false,
        });

        await expect(createAnimalWithSighting(5, { nickname: "Bobo" }) ).rejects.toThrow("Failed to create animal");
    });

    test("createAnimalWithSighting should convert string user_id to number in request URL", async () => {
        const mockForm = { nickname: "Bobo" };

        globalThis.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ success: true }),
        });

        await createAnimalWithSighting("5", mockForm);


        expect(globalThis.fetch).toHaveBeenCalledWith("/api/users/5/tracked-animals", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(mockForm),
        });    
    });

    test("addNewSightingToExistingAnimal should create new sightings to existing animal sucessfully", async () => {
        const mockForm ={
            individual_id: 10,
            address: "123 Ave",
            health_status: "healthy",
        }
        const mockResponse = {
            success: true,
            sightingId: 123
        }

        globalThis.fetch.mockResolvedValueOnce({
            ok: true,
            json: () => mockResponse
        })

        const result = await addNewSightingToExistingAnimal(5, mockForm);
        expect(globalThis.fetch).toHaveBeenCalledWith("/api/users/5/sightings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(mockForm),
        });

        expect(result).toEqual(mockResponse);

    })

    test("addNewSightingToExistingAnimal: should throw eror when POST failed", async () => {
        const mockForm ={
            individual_id: 10,
            address: "123 Ave",
            health_status: "healthy",
        }
        globalThis.fetch.mockResolvedValueOnce({
            ok: false,
        })

        await expect(addNewSightingToExistingAnimal(5, mockForm)).rejects.toThrow("Failed to create animal");

    })

    test ("onSearch: should return etch filtered sightings successfully", async () =>{
        const searchParams = {
            searchText: "cat",
            animal_type: "Cat",
            health_status: "healthy",
            page: 1,
            limit: 12
        };
        const mockResponse = {
            data: [{ id: 1, nickname: "World" }],
            totalCount: 1,
            page: 1,
            limit: 12
        };

        globalThis.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse
        });
    const result = await onSearch(searchParams);

    expect(globalThis.fetch).toHaveBeenCalledWith(
      "/api/sightings/search?searchText=cat&animal_type=Cat&health_status=healthy&page=1&limit=12"
    );

    expect(result).toEqual(mockResponse);
    expect(result.data).toHaveLength(1);

    })

     test("should throw error when search request fails", async () => {

    const searchParams = { searchText: "dog" };

    globalThis.fetch.mockResolvedValueOnce({
      ok: false
    });

    await expect(onSearch(searchParams)).rejects.toThrow(
      "Failed to delete animal"
    );
  });
})

