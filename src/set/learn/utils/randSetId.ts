const randomSetTerm = (set: []) => {
  const randomIndex = Math.floor(Math.random() * set.length);
  return set[randomIndex];
};

export default randomSetTerm;
