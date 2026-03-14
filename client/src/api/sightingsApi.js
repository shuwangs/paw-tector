export const getSightings = async (page) => {
  const response = await fetch(`/api/sightings?page=${page}&limit=12`);

  if (!response.ok) {
    throw new Error("Failed to fetch sightings");
  }
  const data = response.json();
  console.log(data);
  return data;
};

export const createAnimalWithSighting = async (user_id, form) => {
  const response = await fetch(`/api/users/${Number(user_id)}/tracked-animals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });

  if (!response.ok) {
    throw new Error("Failed to create animal");
  }
  const data = await response.json();
  console.log(data);
  return data;
};

export const addNewSightingToExistingAnimal = async (user_id, form) => {
  const response = await fetch(`/api/users/${Number(user_id)}/sightings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });

  if (!response.ok) {
    throw new Error("Failed to create animal");
  }
  const data = await response.json();
  console.log(data);
  return data;

}

export const getSightingsStats = async () => {
    const response = await fetch("/api/sightings/stats");
    if (!response.ok) {
    throw new Error("Failed to create animal");
  }
  const data = await response.json();
    // console.log(data);
  return data;

}

export const onSearch = async(searchParams)=> {
  const query = new URLSearchParams(searchParams).toString();
  console.log( "Searched query is" ,query);

  const response = await fetch(`/api/sightings/search?${query}`);

  if (!response.ok) {
    throw new Error("Failed to create animal");
  }
  const data = await response.json();
  console.log("fetched results in sightingsApi", data);
  return data;
}