export const getAnimalEmoji = (type) => {
  if (type === "cat") return "🐱";
  if (type === "dog") return "🐶";
  if (type === "rabbit") return "🐰";
  if (type === "bird") return "🐦"
  if (type === "raccoon") return "🦝"
  return "🐾"; //default
};

export const capitalize = (str) => str?.charAt(0).toUpperCase() + str?.slice(1);