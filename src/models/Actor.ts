import * as db from "../lib/db";

export type Actor = {
  id?: number;
  firstName?: string;
  lastName?: string;
};

export const create = async (input: Actor) => {
  const { firstName, lastName } = input;
  const data = await db.exec<Actor>("Actor", "Create", {
    firstName,
    lastName
  });
  return data;
};

export const readOne = async (input: Actor) => {
  const { id } = input;
  const data = await db.exec<Actor>("Actor", "Read", { id });
  return data;
};

export const readAll = async () => {
  const data = await db.exec<Actor[]>("Actor", "Read", undefined, true);
  return data;
};

export const update = async (input: Actor) => {
  const { firstName, lastName } = input;
  const data = await db.exec<Actor>("Actor", "Update", {
    actorId: input.id,
    firstName,
    lastName
  });
  return data;
};

export const remove = async (input: Actor) => {
  const { id } = input;
  const data = await db.exec<Actor>("Actor", "Delete", { id });
  return data;
};
