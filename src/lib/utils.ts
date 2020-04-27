export const capitalize = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const addHATEOASLinks = (record: any, url: string) => {
  const links = { _self: `${url}/${record.id}` };
  return { ...record, _links: links };
};
