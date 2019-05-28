import noPosterUrl from './no-poster.png';

const template = (movie, posterUrl) => `
<style>
    :host([hidden]) { display: none }
    .movie {
        border-radius: 5px;
        box-shadow: 0 0 3px #000;
        margin-bottom: 45px;
    }
        .movie__title {
            line-height: 1.2;
            font-weight: 500;
    }
        .movie__heading {
            padding: 15px;
    }
        .movie__detail {
            background-color: #1b131f;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            border-bottom-right-radius: 5px;
            border-bottom-left-radius: 5px;
    }
        .movie__detail a {
            border-radius: 5px 0 5px 0;
    }
        .movie__poster {
            position: relative;
    }
        .movie__poster img {
            border-top-right-radius: 5px;
            border-top-left-radius: 5px;
            max-width: 100%;
    }
        .movie__rating {
            position: absolute;
            right: 15px;
            bottom: 15px;
            color: #fff;
            background-color: #008000;
            border-radius: 50%;
            width: 36px;
            height: 36px;
            font-size: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 15px #008000;
    }
        .movie__date {
            color: #b6b7b9;
            font-size: 14px;
    }
        
</style>
<div class="movie">
  <div class="movie__poster">
    <img src="${posterUrl}" alt="${movie.title}">
    <div class="movie__rating">${movie.vote_average}</div>
  </div>
  <div class="movie__heading">
    <h3 class="movie__title">${movie.title}</h3>
    <div class="movie__date">${movie.release_date}</div>
  </div>
</div>`;

export class MovieCard extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'open' });
    }
    set movie(movie) {
        const posterUrl  = movie.poster_path? `https://image.tmdb.org/t/p/w500${movie.poster_path}`: `${noPosterUrl}`;
        this.root.innerHTML = template(movie, posterUrl);
    }
}

customElements.define('movie-card', MovieCard);
