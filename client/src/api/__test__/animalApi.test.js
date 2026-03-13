import { describe, test, beforeEach, afterEach, expect, vi } from "vitest";
import { getAnimalHistory, getAnimalStats } from "../animalApi";

describe("animalApi", () => {
    beforeEach(() => {
        globalThis.fetch = vi.fn();
    })

    afterEach(() => {
        vi.resetAllMocks();
    })

    test("getAnimalHistory return sucessfully", async () => {
        const mockHistory = {
            animalInfo : [{id: 1,
                nickname: "Bobo"
            }],
            sightedHistory : [
                { sighting_id: 3}
            ]
        }

        globalThis.fetch.mockResolvedValueOnce({
            ok : true,
            json : ()=>mockHistory
        })
        const result = await getAnimalHistory(1);
        expect(globalThis.fetch).toHaveBeenCalledWith('/api/individuals/1');
        expect(result).toEqual(mockHistory);
        expect(result.animalInfo[0].nickname).toBe("Bobo");
    })

    test("getAnimalHistory throw error when fetch fails", async () => {
        globalThis.fetch.mockResolvedValueOnce({
            ok: false
        })

        await expect(getAnimalHistory(1)).rejects.toThrow(
            "Failed to fetch individual"
        );

    })

    test("getAnimalStats return successfully", async () => {
        const mockStats = {
            last_sightings: "2025-05-25",
            sightings_count:2
        }

        globalThis.fetch.mockResolvedValueOnce({
            ok: true,
            json: () => mockStats
        })
        const result = await getAnimalStats(1);
        expect(globalThis.fetch).toHaveBeenCalledWith("/api/individuals/1/stats");
        expect(result).toEqual(mockStats);
        expect(result.sightings_count).toBe(2);
    })

    test("getAnimalStats throw error when fetch fails", async () => {
        globalThis.fetch.mockResolvedValueOnce({
            ok: false
        })

        await expect(getAnimalStats(1)).rejects.toThrow("Failed to fetch individual")
    })

})