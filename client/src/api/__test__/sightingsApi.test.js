import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import { getSightings} from '../sightingsApi.js';

describe("getSightings", () => {
    beforeEach(() => {
        globalThis.fetch = vi.fn();
    });
    afterEach(() => {
        vi.resetAllMocks();
    });

    test("should fetch sightings list successfully", async () => {

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

    test("should throw an error when fetch sightings fails", async () => {
        globalThis.fetch.mockResolvedValueOnce({
            ok: false,
        });

        await expect(getSightings(1)).rejects.toThrow("Failed to fetch sightings");
    });
})

