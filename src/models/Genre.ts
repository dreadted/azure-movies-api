import * as db from "../lib/db";
import { Link } from "../lib/utils";

export type Genre = {
  id?: number;
  name?: string;
  _links?: Link[];
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
  const data = await db.exec<Genre>("Genre", "Read", undefined, true);
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
