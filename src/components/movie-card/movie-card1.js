
import { html, fixture,expect } from '@open-wc/testing';

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

describe('movie-card', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('renders picture, name, title, and phone number based on public property input', async () => {
        // Create initial element
        
        const el = await fixture('<movie-card></movie-card>');

        el.movie = MOVIE_INPUT;
        document.body.appendChild(el);

        // Select elements for validation
        // const imgEl = element.shadowRoot.querySelector('img');
        // expect(imgEl.src).toBe(CONTACT_INPUT.Picture__c);

        console.log(el);
        const movie__rating = el.shadowRoot.querySelector('.movie__rating');
        expect(movie__rating).toBe(MOVIE_INPUT.vote_average);

    });

    // it('renders an informational message if public property is not set', () => {
    //     const MESSAGE = 'No contact data available.';

    //     // Create initial element
    //     const element = createElement('c-contact-tile', {
    //         is: ContactTile
    //     });
    //     document.body.appendChild(element);

    //     // Select element for validation
    //     const detailEl = element.shadowRoot.querySelector('p');
    //     expect(detailEl.textContent).toBe(MESSAGE);
    // });
});