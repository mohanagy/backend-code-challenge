
export const getError = async (req, res) => {
  const { query: { error } } = req;
  if (error) throw new Error('error will not pass');
  return res.json({ message: 'passed' });
};

