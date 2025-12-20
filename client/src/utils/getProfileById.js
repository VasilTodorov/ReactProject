export async function getProfileById(profileId, options = {}) {
  const response = await fetch(`http://localhost:3030/data/profiles/${profileId}`, { signal: options.signal });
  if (!response.ok) throw new Error("Profile not found");
  return await response.json();
}