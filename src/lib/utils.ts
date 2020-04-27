export const addHATEOASLinks = (record: any, url: string) => {
  const links = { _self: `${url}/${record.id}` };
  return { ...record, _links: links };
};
