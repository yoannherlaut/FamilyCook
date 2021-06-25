const dateFormat = (date) => {
  const newDate = new Date(date);
  const format = newDate.getDate() + '/' + (newDate.getMonth() + 1 + '/' + newDate.getFullYear());
  return format;
};

export default dateFormat;
