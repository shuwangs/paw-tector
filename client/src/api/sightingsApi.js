export const getSightings = async () => {
  const response = await fetch("/api/sightings");

  if (!response.ok) {
    throw new Error("Failed to fetch sightings");
  }

  return response.json();
};