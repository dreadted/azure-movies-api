export const capitalize = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export type Hateoas = {
  _rel: string;
  type: string;
  href: string;
};

const PROTOCOL = process.env.PROTOCOL + "://" || "https://";

export const addHATEOASLinks = (record: any, url: string, more?: Hateoas[]) => {
  const links: Hateoas[] = [];
  if (more) {
    more.forEach(hateoas => (hateoas.href = PROTOCOL + hateoas.href));
    return { ...record, _links: [...links, ...more] };
  }
  links.push({
    _rel: "self",
    type: "GET",
    href: `${PROTOCOL + url}/${record.id}`
  });
  return { ...record, _links: links };
};

export const parentURL = (url: string, levels: number): string => {
  const parent: string = url.slice(0, url.lastIndexOf("/"));
  if (levels) return parentURL(parent, levels - 1);
  return parent;
};
