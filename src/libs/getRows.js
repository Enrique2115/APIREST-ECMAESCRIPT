export const getRows = (rows) => {
  let result = rows.filter((item) => {
    return Array.isArray(item);
  });
  return result[0];
};
