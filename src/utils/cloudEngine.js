export const syncData = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error en syncData:", error);
    return null;
  }
};
