const sql = require("mssql");
import config from "./config";
import { fieldsToKebab } from "./utils";

export const read = async (model: string, params?: any) => {
  const pool = await sql.connect(config);

  if (params && params.id) {
    const result = await pool
      .request()
      .input(`${model}Id`, sql.Int, params.id)
      .execute(`dbo.usp_Read_${model}`);
    return fieldsToKebab(result.recordset[0]);
  }

  const result = await pool.request().execute(`dbo.usp_Read_${model}`);
  return result.recordset.map((record: any) => fieldsToKebab(record));
};
