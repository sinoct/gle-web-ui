export const generateLabel = () => {
  const date = new Date();
  const generated = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
  return generated;
};
