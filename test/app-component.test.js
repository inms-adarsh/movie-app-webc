import {
  html,
  fixture,
  expect,
} from '@open-wc/testing';

import '../src/components/movie-card/movie-card.js';

const MOVIE_INPUT = {
  adult: false,
  backdrop_path: "/v4yVTbbl8dE1UP2dWu5CLyaXOku.jpg",
  genre_ids: [12, 14, 10402, 10749, 35, 10751],
  id: 420817,
  original_language: "en",
  original_title: "Aladdin",
  overview: "A kindhearted street urchin named Aladdin embarks on a magical adventure after finding a lamp that releases a wisecracking genie while a power-hungry Grand Vizier vies for the same lamp that has the power to make their deepest wishes come true.",
  popularity: 559.104,
  poster_path: "/3iYQTLGoy7QnjcUYRJy4YrAgGvp.jpg",
  release_date: "2019-05-22",
  title: "Aladdin",
  video: false,
  vote_average: 7.2,
  vote_count: 452
};

let el;
describe('<movie-card>', async () => {
  before(async () => {
    // runs before all tests in this block
    el = await fixture('<movie-card></movie-card>');
  });
  it('has a proper movie rating', async () => {
    //const el = await fixture('<movie-card></movie-card>');
    el.movie = MOVIE_INPUT;
    const title = el.shadowRoot.querySelector('.movie__rating');
    expect(title.innerHTML).to.equal('7.2');
  });

  it('has a proper movie title', async () => {
    //const el = await fixture('<movie-card></movie-card>');
    el.movie = MOVIE_INPUT;
    const title = el.shadowRoot.querySelector('.movie__title');
    expect(title.innerHTML).to.equal('Aladdin');
  });

  it('has a proper movie release date', async () => {
    //const el = await fixture('<movie-card></movie-card>');
    el.movie = MOVIE_INPUT;
    const title = el.shadowRoot.querySelector('.movie__date');
    expect(title.innerHTML).to.equal('2019-05-22');
  });

  it('has a proper movie poster', async () => {
    el.movie = MOVIE_INPUT;
    const title = el.shadowRoot.querySelector('.movie__poster > img');
    expect(title.src).to.equal('https://image.tmdb.org/t/p/w500/3iYQTLGoy7QnjcUYRJy4YrAgGvp.jpg');
  });

  it('has a NO movie poster', async () => {
    delete MOVIE_INPUT.poster_path;
    el.movie = MOVIE_INPUT;
    const title = el.shadowRoot.querySelector('.movie__poster > img');
    expect(title.src).to.contain('no-poster.png');
  });

});
