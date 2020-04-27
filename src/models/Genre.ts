// import * as sql from "mssql";
const sql = require("mssql");
import config from "../lib/config";
import * as db from "../lib/db";

export type Genre = {
  id?: number;
  name?: string;
};

export const create = async (input: Genre) => {
  await sql.connect(config);
  const result = await sql.query(`EXEC dbo.usp_Create_Genre "${input.name}"`);
  return result.recordset[0];
};

export const readOne = async (input: Genre) => {
  const data = await db.read("Genre", { id: input.id });
  return data;
};

export const readAll = async () => {
  const data = await db.read("Genre");
  return data;
};

export const update = async (input: Genre) => {
  await sql.connect(config);
  const result = await sql.query(
    `EXEC dbo.usp_Update_Genre ${input.id}, ${input.name}`
  );
  return result.recordset[0];
};

export const remove = async (input: Genre) => {
  await sql.connect(config);
  const result = await sql.query(`EXEC dbo.usp_Delete_Genre ${input.id}`);
  return result.recordset[0];
};
