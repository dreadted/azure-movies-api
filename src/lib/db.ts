const sql = require("mssql");
import config from "./config";
import { camelCase, upperFirst } from "lodash";
import { convertKeys } from "./utils";

const pascalCase = (str: string | undefined) => {
  return upperFirst(camelCase(str));
};

export const exec = async <T extends {}>(
  model: string,
  procedure: string,
  params?: any,
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
  // TODO: Try to identify if T is array type
  if (getCollection)
    return result.recordset.map((record: any) =>
      convertKeys(record, camelCase, model)
    ) as T;
  return convertKeys(result.recordset[0], camelCase, model) as T;
};
