import * as db from "../lib/db";
import { Genre } from "./Genre";
import * as MovieGenre from "./MovieGenre";

export type Movie = {
  id?: number;
  name?: string;
  description?: string;
  imageUrl?: string;
  productionYear?: number;
  movieGenre?: Genre[];
};

// TODO: Error handling!
const addMovieGenres = async (movieId: number, genres: Genre[]) => {
  for (let i = 0; i < genres.length; i++) {
    await MovieGenre.create({ movieId, genreId: genres[i].id });
  }
};

const convertGenreKeys = (genres: Genre[]) => {
  return genres.map((genre: any) => {
    return { id: genre["genre-id"], name: genre["genre-name"] };
  });
};

export const create = async (input: Movie) => {
  const { name, description, imageUrl, productionYear, movieGenre } = input;
  const data = await db.exec<Movie>("Movie", "Create", {
    name,
    description,
    imageUrl,
    productionYear
  });
  const inputGenres: Genre[] = movieGenre || [];

  if (data && data.id && inputGenres && inputGenres.length) {
    await addMovieGenres(data.id, inputGenres);

    const outputGenres = await MovieGenre.readAll({ movieId: data.id });
    data.movieGenre = convertGenreKeys(outputGenres);
  }

  return data;
};

export const readOne = async (input: Movie) => {
  const { id } = input;
  const data = await db.exec<Movie>("Movie", "Read", { id });
  const genres = await MovieGenre.readAll({ movieId: id });
  if (genres && genres.length)
    data.movieGenre = genres.map((genre: any) => {
      return { id: genre["genre-id"], name: genre["genre-name"] };
    });
  return data;
};

export const readAll = async () => {
  const data = await db.exec<Movie[]>("Movie", "Read", undefined, true);
  if (data && data.length) {
    const genres = await MovieGenre.readAll({});
    if (genres && genres.length) {
      data.forEach(
        (movie: Movie) =>
          (movie.movieGenre = genres
            .filter((genre: any) => genre["movie-id"] === movie.id)
            .map((genre: any) => {
              return { id: genre["genre-id"], name: genre["genre-name"] };
            }))
      );
    }
  }

  return data;
};

export const update = async (input: Movie) => {
  const { id, name, description, imageUrl, productionYear, movieGenre } = input;

  const data = await db.exec<Movie>("Movie", "Update", {
    id,
    name,
    description,
    imageUrl,
    productionYear
  });

  if (data && data.id) {
    await MovieGenre.remove({ movieId: data.id });
    const inputGenres: Genre[] = movieGenre || [];

    if (inputGenres && inputGenres.length) {
      await addMovieGenres(data.id, inputGenres);

      const outputGenres = await MovieGenre.readAll({ movieId: data.id });
      data.movieGenre = convertGenreKeys(outputGenres);
    }
  }

  return data;
};

export const remove = async (input: Movie) => {
  const data = await db.exec<Movie>("Movie", "Delete", { movieId: input.id });
  return data;
};
