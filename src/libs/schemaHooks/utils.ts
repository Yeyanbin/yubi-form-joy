
export const getDefaultFormValue = (content, state) => {
  const obj = {};
  content.forEach((item) => {
    obj[item.path] = state[item.path] || '';
  });
  console.log('default Form Value', obj);
  return obj;
};
