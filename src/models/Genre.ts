import * as db from "../lib/db";

export type Genre = {
  id?: number;
  name?: string;
  _links?: any;
};

export const create = async (input: Genre) => {
  const { name } = input;
  const data = await db.exec<Genre>("Genre", "Create", { name });
  return data;
};

export const readOne = async (input: Genre) => {
  const { id } = input;
  const data = await db.exec<Genre>("Genre", "Read", { id });
  return data;
};

export const readAll = async () => {
  const data = await db.exec<Genre[]>("Genre", "Read", undefined, true);
  return data;
};

export const update = async (input: Genre) => {
  const { id, name } = input;
  const data = await db.exec<Genre>("Genre", "Update", { id, name });
  return data;
};

export const remove = async (input: Genre) => {
  const { id } = input;
  const data = await db.exec<Genre>("Genre", "Delete", { id });
  return data;
};
