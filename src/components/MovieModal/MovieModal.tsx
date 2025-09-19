import { useEffect } from "react";
import { createPortal } from "react-dom";
import css from "./MovieModal.module.css";
import type { Movie } from "../../types/movie";

export interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const modalRootId = "modal-root";
function ensureModalRoot(): HTMLElement {
  let el = document.getElementById(modalRootId);
  if (!el) {
    el = document.createElement("div");
    el.id = modalRootId;
    document.body.appendChild(el);
  }
  return el;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  const modalRoot = ensureModalRoot();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const back = (p: string) => `https://image.tmdb.org/t/p/original${p}`;
  const onBackdrop = (e: React.MouseEvent<HTMLDivElement>) =>
    e.target === e.currentTarget && onClose();

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={onBackdrop}
    >
      <div className={css.modal}>
        <button
          className={css.closeButton}
          aria-label="Close modal"
          onClick={onClose}
        >
          &times;
        </button>

        {movie.backdrop_path ? (
          <img
            className={css.image}
            src={back(movie.backdrop_path)}
            alt={movie.title}
          />
        ) : (
          <div className={css.image} aria-label="No backdrop" />
        )}

        <div className={css.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>
            <strong>Release Date:</strong> {movie.release_date || "—"}
          </p>
          <p>
            <strong>Rating:</strong>{" "}
            {movie.vote_average ? `${movie.vote_average}/10` : "—"}
          </p>
        </div>
      </div>
    </div>,
    modalRoot
  );
}
