const sql = require("mssql");
import config from "./config";
import { camelCase, upperFirst } from "lodash";
import { convertKeys } from "./utils";

const pascalCase = (str: string | undefined) => {
  return upperFirst(camelCase(str));
};

interface Exec {
  <T>(model: string, procedure: string, params: T | undefined): Promise<T>;

  <T>(
    model: string,
    procedure: string,
    params: T | undefined,
    getCollection: boolean
  ): Promise<T[]>;
}

export const exec: Exec = async <T>(
  model: string,
  procedure: string,
  params?: T,
  getCollection?: boolean
) => {
  const pool = await sql.connect(config);
  const request = pool.request();

  if (params) {
    const sqlParams: any = convertKeys(params, pascalCase, model);

    for (const key in sqlParams) {
      request.input(key, sqlParams[key]);
    }
  }
  const result = await request.execute(`dbo.usp_${procedure}_${model}`);
  if (getCollection)
    return result.recordset.map((record: any) =>
      convertKeys(record, camelCase, model)
    ) as T;
  return convertKeys(result.recordset[0], camelCase, model) as T;
};
