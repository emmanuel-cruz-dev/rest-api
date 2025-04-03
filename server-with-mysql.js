import { createApp } from "./app";
import { MovieModel } from "./models/mysql/movie.js";

createApp({ movieModel: MovieModel });
