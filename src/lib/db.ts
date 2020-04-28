const sql = require("mssql");
import config from "./config";
import { camelCase, kebabCase, upperFirst } from "lodash";

const pascalCase = (str: string | undefined) => {
  return upperFirst(camelCase(str));
  // return startCase(camelCase(str)).replace(/ /g, '');
};

type Converter = (str?: string | undefined) => string;

const convertKeys = (record: any, converter: Converter, model?: string) => {
  const obj = {};
  if (record) {
    for (const pair of Object.entries(record)) {
      if (Object(pair) === pair) {
        const { "0": key, "1": val } = pair;
        Object.defineProperty(
          obj,
          converter(key.replace(model ? model : "", "")),
          {
            configurable: true,
            enumerable: true,
            writable: true,
            value: val
          }
        );
      }
    }
    if (Object.keys(obj).length) return obj;
  }
};

export const exec = async (
  model: string,
  procedure: string,
  params?: any,
  getCollection?: boolean
) => {
  const pool = await sql.connect(config);
  const request = pool.request();

  if (params) {
    const sqlParams: any = convertKeys(params, pascalCase);

    for (const key in sqlParams) {
      request.input(key, sqlParams[key]);
    }
  }
  const result = await request.execute(`dbo.usp_${procedure}_${model}`);
  if (getCollection)
    return result.recordset.map((record: any) =>
      convertKeys(record, kebabCase, model)
    );
  return convertKeys(result.recordset[0], kebabCase, model);
};
