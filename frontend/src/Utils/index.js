export const orderByName = data => {
  return data.sort((a, b) =>
    a.nome.localeCompare(b.nome, { sensitivity: 'base' })
  );
};

export const orderByNumber = data => {
  return data.sort((a, b) => a.ordem - b.ordem);
};
