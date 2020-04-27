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

export const create = async (model: string, params: any) => {
  const pool = await sql.connect(config);
  const sqlParams: any = convertKeys(params, pascalCase);
  const request = pool.request();

  for (const key in sqlParams) {
    request.input(key, sqlParams[key]);
  }

  const result = await request.execute(`dbo.usp_Create_${model}`);
  return convertKeys(result.recordset[0], kebabCase);
};

export const read = async (model: string, params?: any) => {
  const pool = await sql.connect(config);

  if (params && params.id) {
    const result = await pool
      .request()
      .input(`${model}Id`, sql.Int, params.id)
      .execute(`dbo.usp_Read_${model}`);
    return convertKeys(result.recordset[0], kebabCase);
  }

  const result = await pool.request().execute(`dbo.usp_Read_${model}`);
  return result.recordset.map((record: any) => convertKeys(record, kebabCase));
};

export const update = async (model: string, params: any) => {
  const pool = await sql.connect(config);
  const sqlParams: any = convertKeys(params, pascalCase);
  const request = pool.request();

  for (const key in sqlParams) {
    request.input(key, sqlParams[key]);
  }

  const result = await request.execute(`dbo.usp_Update_${model}`);
  return convertKeys(result.recordset[0], kebabCase);
};

export const remove = async (model: string, params: any) => {
  const pool = await sql.connect(config);
  if (params && params.id) {
    const result = await pool
      .request()
      .input(`${model}Id`, sql.Int, params.id)
      .execute(`dbo.usp_Delete_${model}`);
    return convertKeys(result.recordset[0], kebabCase);
  }
  return undefined;
};
