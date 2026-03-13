import {describe, test, expect, vi, beforeEach, afterEach} from 'vitest';
import {getUsers, getUserStats, updateTrackedAnimal, fetchTrackedAnimals, onDeleteTrackedAnimal } from '../userApi.js';

describe("userApi Testing", () => {
    beforeEach(()=> {
        globalThis.fetch = vi.fn();
    })
    afterEach(() => {
        vi.resetAllMocks();
    })

    test("getUser fetch correctly", async () => {
        const mockUsers = [
            {id: 1, username: "tester1"},
            {id: 2, username: "tester2"}]

        globalThis.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockUsers,
        })

        const result = await getUsers();

        expect(globalThis.fetch).toHaveBeenCalledWith("/api/users");
        expect(result).toEqual(mockUsers);
        expect(result).toHaveLength(2);

    })

    test("getUser fetch failed throw error", async () =>{
        globalThis.fetch.mockResolvedValueOnce({
            ok: false
        })

        await expect(getUsers()).rejects.toThrow("Failed to fetch users");
    })

    test("getUserStats should fetch user stats successfully", async () => {
      const mockStats = {
        total_tracked_animals: 5,
        total_sightings: 12,
      };

      globalThis.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockStats,
      });

      const result = await getUserStats(3);

      expect(globalThis.fetch).toHaveBeenCalledWith("/api/users/3/stats");
      expect(result).toEqual(mockStats);
    });

    test ("getUserStats throw error when fetch user stats fails", async () => {
        globalThis.fetch.mockResolvedValueOnce({
            ok: false,
            status: 400,
        });

        await expect( getUserStats(3)).rejects.toThrow("Fetch user stats failed (400)")
    })

    test("updateTrackedAnimal update tracked animal successfully", async () => {
        const payload = {
            nickname: "Amy",
            color: "orange",
        };
        const mockUpdatedAnimal = {
            id: 3,
            nickname: "Bee",
            color: "orange",
        };

        globalThis.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockUpdatedAnimal,
        });

        const result = await updateTrackedAnimal(1, 3, payload);
        expect(globalThis.fetch).toHaveBeenCalledWith(
            "/api/users/1/tracked-animals/3",
            {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
            }
        );

        expect(result).toEqual(mockUpdatedAnimal);
  
    })

    test("updateTrackedAnimal should throw error when updateTrackedAnimal fails", async () => {
      globalThis.fetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      await expect(updateTrackedAnimal(5, 10, {})).rejects.toThrow(
        "Failed to update animal (404)"
      );
    });

    test ("fetchTrackedAnimals", async() => {
        const mockTrackedAnimals = [
            { id: 1, nickname: "Amy" },
            { id: 2, nickname: "Bee" }
        ];

        globalThis.fetch.mockResolvedValueOnce({
            ok: true, 
            json: async () => mockTrackedAnimals
        })

        const result = await fetchTrackedAnimals(1);

        expect(globalThis.fetch).toHaveBeenCalledWith("/api/users/1/tracked-animals");
        expect(result).toEqual(mockTrackedAnimals);
        expect(result).toHaveLength(2);
    })

    test("fetchTrackedAnimals-should throw error when fetchTrackedAnimals fails", async () => {
        globalThis.fetch.mockResolvedValueOnce({
            ok: false,
            status: 500,
        });

        await expect(fetchTrackedAnimals(5)).rejects.toThrow(
            "Fetch tracked animals failed (500)"
        );
    });

    test("onDeleteTrackedAnimal should delete trackedAnimal sucessfully", async () => {
        globalThis.fetch.mockResolvedValueOnce({
            ok: true,
            status: 204
        })

        const result = await onDeleteTrackedAnimal(3, 1);
        expect(globalThis.fetch).toHaveBeenCalledWith('/api/users/3/tracked-animals/1', {
            method: "DELETE"
        });

        expect(result).toBe(true);
    })

    test("onDeleteTrackedAnimal should delete trackedAnimal sucessfully", async () => {
        globalThis.fetch.mockResolvedValueOnce({
            ok: false,
            status: 404
        })

        await expect(onDeleteTrackedAnimal(1, 10)).rejects.toThrow(
            "Delete tracked animal failed (404)"
        );
    })

});

