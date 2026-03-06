export const getSightings = async () => {
  const response = await fetch("/api/sightings");

  if (!response.ok) {
    throw new Error("Failed to fetch sightings");
  }

  return response.json();
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