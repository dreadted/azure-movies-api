import * as db from "../lib/db";

export type MovieGenre = {
  movieId?: number;
  genreId?: number;
  genreName?: string;
};

export const create = async (input: MovieGenre) => {
  const data = await db.exec<MovieGenre>("MovieGenre", "Create", {
    movieId: input.movieId,
    genreId: input.genreId
  });
  return data;
};

export const readAll = async (input: MovieGenre) => {
  const movieId = input.movieId || null;
  const genreId = input.genreId || null;
  const data = await db.exec<MovieGenre[]>(
    "MovieGenre",
    "Read",
    { movieId, genreId },
    true
  );
  return data;
};

export const remove = async (input: MovieGenre) => {
  const movieId = input.movieId || null;
  const genreId = input.genreId || null;
  const data = await db.exec<MovieGenre>("MovieGenre", "Delete", {
    movieId,
    genreId
  });
  return data;
};
