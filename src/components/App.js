import MovieService from '../services/movies.service.js';

import './search-form/search-form.js';
import './movie-card/movie-card.js';

const template = `
    <style>
        :host([hidden]) { display: none }
        .container {
            margin: 0 auto;
            max-width: 1140px;
            padding: 0 15px;
        }
        #main {
            grid-template-columns: 3fr 3fr 3fr;
            grid-column-gap: 30px;
            padding-bottom: 18px;
            padding-top: 6px;
            display: grid;
            width: 100%;
        }

        #no-movies {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .hide {
            display: none !important;
        }
        @media screen and (max-width: 600px) {
            #main { grid-template-columns: 1fr; }
        }
    </style>

    <main class="container">
        <search-form></search-form>
        <div id="main"></div>
        <div id="no-movies" class="hide">No Movies. Please Search again</div>
    </main>
`;
export class AppComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.state = {
            currentPageNumber: 1,
            currentSearchTerm: '',
            lastPage: false
        }
        
        const shadowRoot = this.attachShadow({mode: 'open'});

        shadowRoot.innerHTML = template;

        this.getMovies();
        this.setUpSearch();
        this.setUpInfiniteScroll();
    }

    async setUpInfiniteScroll() {
        window.addEventListener('scroll', async (ev) => {
            this.loadMoreMovies();
        });
    }

    /**
     * Should load more movies
     */
    loadMoreMovies() {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            if (!this.state.lastPage) {
                this.state.currentPageNumber = this.state.currentPageNumber + 1;
                this.getMovies(this.state.currentSearchTerm, this.state.currentPageNumber);
            }
        }
    }

    /**
     * Set Up Search
     */
    async setUpSearch() {
        this.searchForm = this.shadowRoot.querySelector('search-form');
        /**
         * Custom Event Listener
         */
        this.searchForm.addEventListener('search', async (ev) => {
            this.searchMovies(ev.detail.searchTerm);
        });
    }
    /**
     * Call get Movie
     * @param {*} searchTerm 
     * @param {*} pageNumber 
     */
    async getMovies(searchTerm = '', pageNumber = 1) {
        const movieService = new MovieService();
        const json = await movieService.search(searchTerm, pageNumber);
        this.loadMovies(json);
    }

    /**
     * Load Movies in movie-grid web component
     * @param {*} results 
     */
    loadMovies(searchResult) {
        if (searchResult.total_pages === searchResult.page) {
            this.state.lastPage = true;
        } else {
            this.state.lastPage = false;
        }
        
        this.update(searchResult.results);
    }

    /**
     * Update Screen with new movies
     * @param {*} movies 
     */
    update(movies) {
        const main = this.shadowRoot.querySelector('#main');
        if(movies.length === 0) {
            while (main.firstChild) main.removeChild(main.firstChild);
            this.shadowRoot.querySelector('#no-movies').classList.remove('hide');
            return;
        }
        movies.forEach(movie => {
            this.shadowRoot.querySelector('#no-movies').classList.add('hide');
            const el = document.createElement('movie-card');
            el.movie = movie;
            main.appendChild(el);
        });
    }

    
    /**
     * Search Movies on new search term
     * @param {*} searchTerm 
     */
    searchMovies(searchTerm) {
        this.state = {
            ...this.state,
            currentSearchTerm: searchTerm,
            currentPageNumber: 1
        };

        this.clearMovies();    
        this.getMovies(searchTerm);
    }
    
    /**
     * Clear Movies
     */
    clearMovies() {
        const main = this.shadowRoot.querySelector('#main');     
        while (main.firstChild) main.removeChild(main.firstChild);
    }
}

customElements.define('app-component', AppComponent);