import mysql from "mysql2/promise";

const config = {
  host: "localhost",
  user: "root",
  port: 3306,
  password: "",
  database: "moviesdb",
};

const connection = await mysql.createConnection(config);

export class MovieModel {
  static async getAll({ genre }) {
    if (genre) {
      const lowerCaseGenre = genre.toLowerCase();

      // Get genre ids from database table using genre names
      const [genres] = await connection.query(
        `SELECT id, name FROM genre WHERE LOWER(name) = ?;`,
        [lowerCaseGenre]
      );

      // No genre found
      if (genres.length === 0) return [];

      // Get the id from the first genre result
      const [{ id }] = genres;

      // Get all movies ids from database table
      // la query a movie_genres
      // join
      // y devolver resultados...

      return [];
    }

    const [movies] = await connection.query(
      `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie;`
    );
    return movies;
  }

  static async getById({ id }) {
    const [movies] = await connection.query(
      `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie WHERE id = UUID_TO_BIN(?);`,
      [id]
    );

    if (movies.length === 0) return null;

    return movies[0];
  }

  static async create({ input }) {
    const {
      genre: genreInput,
      title,
      year,
      duration,
      director,
      rate,
      poster,
    } = input;

    // Inser movie
    const [uuidResult] = await connection.query("SELECT UUID() uuid;");
    const [{ uuid }] = uuidResult;

    try {
      await connection.query(
        `INSERT INTO movie (id, title, year, director, duration, poster, rate) VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?);`,
        [title, year, director, duration, poster, rate]
      );
    } catch (err) {
      throw new Error("Error creating movie.");
    }

    const [movies] = await connection.query(
      `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie WHERE id = UUID_TO_BIN(?);`,
      [uuid]
    );

    return movies[0];
  }

  static async delete({ id }) {}

  static async update({ id, input }) {}
}
