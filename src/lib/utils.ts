export const capitalize = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export type HATEOASObject = {
  rel: string;
  href: string;
  fromParent?: boolean;
};

type HATEOASLink = {
  [key: string]: { href: string };
};

const PROTOCOL = process.env.PROTOCOL + "://" || "https://";

export const parentURL = (url: string, levels: number): string => {
  const parent: string = url.slice(0, url.lastIndexOf("/"));
  if (levels) return parentURL(parent, levels - 1);
  return parent;
};

export const createHATEOAS = (
  document: any,
  url: string,
  hateoas?: HATEOASObject[],
  addSelf: boolean = true
) => {
  if (url.match(/(^.+\/\d+$)/)) url = parentURL(url, 0);
  const links = [];
  if (addSelf)
    links.push({ self: { href: `${PROTOCOL + url}/${document.id}` } });
  if (hateoas) {
    hateoas.forEach(item => {
      item.href =
        PROTOCOL +
          (item.fromParent ? url + "/" + document.id : parentURL(url, 0)) +
          item.href || "";
      const link: HATEOASLink = {};
      link[item.rel] = { href: item.href };
      links.push(link);
    });
  }
  return { ...document, _links: links };
};
