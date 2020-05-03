import * as db from "../lib/db";

export type Role = {
  id?: number;
  movieId?: number | null;
  actorId?: number | null;
  name?: string;
};

export const create = async (input: Role) => {
  const data = await db.exec<Role>("Role", "Create", {
    name: input.name,
    movieId: input.movieId,
    actorId: input.actorId
  });
  return data;
};

export const readAll = async (input: Role) => {
  const movieId = input.movieId || null;
  const actorId = input.actorId || null;
  const data = await db.exec<Role>("Role", "Read", { movieId, actorId }, true);
  return data;
};

export const remove = async (input: Role) => {
  const movieId = input.movieId || null;
  const actorId = input.actorId || null;
  const id = input.id;
  const data = await db.exec<Role>("Role", "Delete", {
    id,
    movieId,
    actorId
  });
  return data;
};
