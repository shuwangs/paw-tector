export const getUsers = async () => {
    const response = await fetch('/api/users');
    if(!response.ok) {
        throw new Error('Failed to fetch users');
    }

    return response.json();
};

export const getUserStats = async (userId) =>{
    const response = await fetch(`/api/users/${userId}/stats`);
    if(!response.ok) {
        throw new Error(`Fetch user stats failed (${response.status})`);
    }
    const data = await response.json();
    return data;
     
}

  
            