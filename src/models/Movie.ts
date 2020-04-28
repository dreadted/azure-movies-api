import * as db from "../lib/db";
import { Genre } from "./Genre";

export type Movie = {
  id?: number;
  name?: string;
  description?: string;
  "image-url"?: string;
  "production-year"?: number;
  "movie-genre"?: Genre[];
};

type MovieGenre = { id: number; name: string };

// TODO: Error handling!
const addMovieGenres = async (movieId: number, genres: Genre[]) => {
  for (let i = 0; i < genres.length; i++) {
    await db.exec<MovieGenre>("MovieGenre", "Create", {
      movieId,
      genreId: genres[i].id
    });
  }
};

const convertGenreKeys = (genres: Genre[]) => {
  return genres.map((genre: any) => {
    return { id: genre["genre-id"], name: genre["genre-name"] };
  });
};

export const create = async (input: Movie) => {
  const data = await db.exec<Movie>("Movie", "Create", {
    MovieName: input.name,
    MovieDescription: input.description,
    ImageURL: input["image-url"],
    ProductionYear: input["production-year"]
  });
  const inputGenres: Genre[] = input["movie-genre"] ? input["movie-genre"] : [];

  if (data && data.id && inputGenres && inputGenres.length) {
    await addMovieGenres(data.id, inputGenres);

    const outputGenres = await db.exec<MovieGenre[]>(
      "MovieGenre",
      "Read",
      { movieId: data.id },
      true
    );
    data["movie-genre"] = convertGenreKeys(outputGenres);
  }

  return data;
};

export const readOne = async (input: Movie) => {
  const data = await db.exec<Movie>("Movie", "Read", { MovieId: input.id });
  const genres = await db.exec<MovieGenre[]>(
    "MovieGenre",
    "Read",
    { MovieId: input.id },
    true
  );
  if (genres && genres.length)
    data["movie-genre"] = genres.map((genre: any) => {
      return { id: genre["genre-id"], name: genre["genre-name"] };
    });
  return data;
};

export const readAll = async () => {
  const data = await db.exec<Movie[]>("Movie", "Read", undefined, true);
  if (data && data.length) {
    const genres = await db.exec<MovieGenre[]>(
      "MovieGenre",
      "Read",
      undefined,
      true
    );
    if (genres && genres.length) {
      data.forEach(
        (movie: Movie) =>
          (movie["movie-genre"] = genres
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
  const data = await db.exec<Movie>("Movie", "Update", {
    movieId: input.id,
    movieName: input.name,
    movieDescription: input.description,
    imageURL: input["image-url"],
    productionYear: input["production-year"]
  });

  if (data && data.id) {
    await db.exec<MovieGenre>("MovieGenre", "Delete", { movieId: data.id });
    const inputGenres: Genre[] = input["movie-genre"]
      ? input["movie-genre"]
      : [];

    if (inputGenres && inputGenres.length) {
      await addMovieGenres(data.id, inputGenres);

      const outputGenres = await db.exec<MovieGenre[]>(
        "MovieGenre",
        "Read",
        { movieId: data.id },
        true
      );
      data["movie-genre"] = convertGenreKeys(outputGenres);
    }
  }

  return data;
};

export const remove = async (input: Movie) => {
  const data = await db.exec<Movie>("Movie", "Delete", { movieId: input.id });
  return data;
};
