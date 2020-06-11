export function toTableStructure(fieldNames, data) {
  const fieldKeys = Object.keys(data[0]);

  const columns = fieldKeys.map((key, index) => {
    const entry = {};
    entry[key] = fieldNames[index];
    return entry;
  })
  .reduce((reduced, next) => ({...reduced, ...next}));

  return [columns, data];
}