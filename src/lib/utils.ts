import { Request } from "express";
import { kebabCase, upperFirst } from "lodash";

export const capitalize = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const keyName = (key: string, model?: string) => {
  const keysToConvert = ["id", "name", "description"];
  if (model && keysToConvert.includes(key)) return model + upperFirst(key);
  return key.replace(model || "", "");
};

type Converter = (str?: string | undefined) => string;

export const convertKeys = (
  record: any,
  converter: Converter,
  model?: string
) => {
  const obj = {};
  if (record) {
    for (const pair of Object.entries(record)) {
      if (Object(pair) === pair) {
        const { "0": key, "1": val } = pair;
        Object.defineProperty(obj, converter(keyName(key, model)), {
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

export type HATEOAS = {
  rel: string;
  href: string;
  fromParent?: boolean;
};

export type Link = {
  [key: string]: { href: string };
};

export const parentURL = (url: string, levels: number): string => {
  const parent: string = url.slice(0, url.lastIndexOf("/"));
  if (levels) return parentURL(parent, levels - 1);
  return parent;
};

interface HasId {
  id?: number;
}
export const createResponse = (
  document: HasId,
  req: Request,
  hateoas?: HATEOAS[],
  addSelf: boolean = true
) => {
  let url: string = `${req.protocol}://${req.headers.host}${req.baseUrl}`;
  if (url.match(/(^.+\/\d+$)/)) url = parentURL(url, 0);

  const links = [];
  if (addSelf)
    links.push({
      self: {
        href: `${url}/${document.id}`
      }
    });
  if (hateoas) {
    hateoas.forEach(item => {
      item.href =
        (item.fromParent
          ? `${url}/${document.id || ""}`
          : `${parentURL(url, 0)}`) + item.href || "";
      const link: Link = {};
      link[item.rel] = { href: item.href };
      links.push(link);
    });
  }
  return { ...convertKeys(document, kebabCase), _links: links };
};
