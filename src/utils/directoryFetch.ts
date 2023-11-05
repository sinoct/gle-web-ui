export const getDirectories = async () => {
  const res = await fetch("http://localhost:3000/api/get-directories", {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const directories = await res.text();
  return JSON.parse(directories);
};
