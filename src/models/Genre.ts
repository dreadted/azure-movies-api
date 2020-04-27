import * as db from "../lib/db";

export type Genre = {
  id?: number;
  name?: string;
};

export const create = async (input: Genre) => {
  const data = await db.create("Genre", { genreName: input.name });
  return data;
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
  const data = await db.update("Genre", {
    genreId: input.id,
    genreName: input.name
  });
  return data;
};

export const remove = async (input: Genre) => {
  const data = await db.remove("Genre", { id: input.id });
  return data;
};
