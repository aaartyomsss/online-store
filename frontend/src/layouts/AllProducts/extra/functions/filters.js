const decending = (list, propertyName) => {
  return list.sort((a, b) => b[propertyName] - a[propertyName]);
};

const ascending = (list, propertyName) => {
  return list.sort((a, b) => a[propertyName] - b[propertyName]);
};

const filters = {
  decending,
  ascending,
};

export default filters;
