import css from "./MovieGrid.module.css";
import type { Movie } from "../../types/movie";

export interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

const IMG = (p: string) => `https://image.tmdb.org/t/p/w500${p}`;

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  if (!movies.length) return null;

  return (
    <ul className={css.grid}>
      {movies.map((m) => (
        <li key={m.id}>
          <div className={css.card} onClick={() => onSelect(m)} role="button">
            {m.poster_path ? (
              <img
                className={css.image}
                src={IMG(m.poster_path)}
                alt={m.title}
                loading="lazy"
              />
            ) : (
              <div className={css.image} aria-label="No poster" />
            )}
            <h2 className={css.title}>{m.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}
