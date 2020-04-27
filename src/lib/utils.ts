const kebabCase = (str: string) => {
  return str
    .replace(/(?!^)([A-Z])/g, " $1")
    .replace(/[_\s]+(?=[a-zA-Z])/g, "-")
    .toLowerCase();
};

export const fieldsToKebab = (record: any) => {
  const obj = {};
  if (record) {
    for (const pair of Object.entries(record)) {
      if (Object(pair) === pair) {
        const { "0": key, "1": val } = pair;
        Object.defineProperty(obj, kebabCase(key), {
          configurable: true,
          enumerable: true,
          writable: true,
          value: val
        });
      }
    }
    if (Object.keys(obj).length) return obj;
  }
};
