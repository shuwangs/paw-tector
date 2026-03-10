export const getUsers = async () => {
    const response = await fetch('/api/users');
    if(!response.ok) {
        throw new Error('Failed to fetch users');
    }

    return response.json();
};

export const getUserStats = async (userId) =>{
    const response = await fetch(`/api/users/${Number(userId)}/stats`);
    if(!response.ok) {
        throw new Error(`Fetch user stats failed (${response.status})`);
    }
    const data = await response.json();
    return data;
     
}

export const updateTrackedAnimal = async (user_id, animal_id, payload )=> {
    console.log("edit animal form submission");
    const userId = Number(user_id);
    const individualId = Number(animal_id);
    console.log(payload);

    
    const response = await fetch(`/api/users/${userId}/tracked-animals/${individualId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
            }, 
            body: JSON.stringify(payload)      
        })

    if (!response.ok) {
        throw new Error(`Failed to update animal (${response.status})`);
    }
    const updatedAnimal = await response.json();
    return updatedAnimal;

}

export const fetchTrackedAnimals = async (userId) => {
    const response = await fetch(`/api/users/${userId}/tracked-animals`);
    if(!response.ok) {
        throw new Error(`Fetch tracked animals failed (${response.status})`);
    }
    const data = await response.json();

    return data
}

  
            