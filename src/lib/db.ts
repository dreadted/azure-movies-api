const sql = require("mssql");
import config from "./config";
import { camelCase, kebabCase, upperFirst } from "lodash";

const pascalCase = (str: string | undefined) => {
  return upperFirst(camelCase(str));
  // return startCase(camelCase(str)).replace(/ /g, '');
};

type Converter = (str?: string | undefined) => string;

const convertKeys = (record: any, converter: Converter) => {
  const obj = {};
  if (record) {
    for (const pair of Object.entries(record)) {
      if (Object(pair) === pair) {
        const { "0": key, "1": val } = pair;
        Object.defineProperty(obj, converter(key), {
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

export const run = async (model: string, procedure: string, params?: any) => {
  const pool = await sql.connect(config);

  if (params) {
    const sqlParams: any = convertKeys(params, pascalCase);
    const request = pool.request();

    for (const key in sqlParams) {
      request.input(key, sqlParams[key]);
    }

    const result = await request.execute(`dbo.usp_${procedure}_${model}`);
    return convertKeys(result.recordset[0], kebabCase);
  }
  const result = await pool.request().execute(`dbo.usp_Read_${model}`);
  return result.recordset.map((record: any) => convertKeys(record, kebabCase));
};
