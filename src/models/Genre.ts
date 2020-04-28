import * as db from "../lib/db";

export type Genre = {
  id?: number;
  name?: string;
};

export const create = async (input: Genre) => {
  const data = await db.exec<Genre>("Genre", "Create", {
    genreName: input.name
  });
  return data;
};

export const readOne = async (input: Genre) => {
  const data = await db.exec<Genre>("Genre", "Read", { genreId: input.id });
  return data;
};

export const readAll = async () => {
  const data = await db.exec<Genre[]>("Genre", "Read", undefined, true);
  return data;
};

export const update = async (input: Genre) => {
  const data = await db.exec<Genre>("Genre", "Update", {
    genreId: input.id,
    genreName: input.name
  });
  return data;
};

export const remove = async (input: Genre) => {
  const data = await db.exec<Genre>("Genre", "Delete", { genreId: input.id });
  return data;
};
