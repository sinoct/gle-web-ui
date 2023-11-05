export const generateLabel = () => {
  const date = new Date();
  const generated = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
  console.log(generated);
  return generated;
};
