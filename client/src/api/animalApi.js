

export const getAnimalHistory = async (animalId) => {
    const response = await fetch(`/api/individuals/${Number(animalId)}`);
    if(!response.ok) {
        throw new Error ('Failed to fetch individual');
    }
    const data = response.json();
    return data;
}

export const getAnimalStats = async (animalId) => {
    const response = await fetch(`/api/individuals/${Number(animalId)}/stats`);
    if(!response.ok) {
        throw new Error ('Failed to fetch individual');
    }
    const data = response.json();
    return data;
}