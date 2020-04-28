import * as db from "../lib/db";

export type Actor = {
  id?: number;
  "first-name"?: string;
  "last-name"?: string;
};

export const create = async (input: Actor) => {
  const firstName = input["first-name"];
  const lastName = input["last-name"];
  const data = await db.exec<Actor>("Actor", "Create", {
    firstName,
    lastName
  });
  return data;
};

export const readOne = async (input: Actor) => {
  const data = await db.exec<Actor>("Actor", "Read", { actorId: input.id });
  return data;
};

export const readAll = async () => {
  const data = await db.exec<Actor[]>("Actor", "Read", undefined, true);
  return data;
};

export const update = async (input: Actor) => {
  const data = await db.exec<Actor>("Actor", "Update", {
    actorId: input.id,
    firstName: input["first-name"],
    lastName: input["last-name"]
  });
  return data;
};

export const remove = async (input: Actor) => {
  const data = await db.exec<Actor>("Actor", "Delete", { actorId: input.id });
  return data;
};
