import {
    html,
    fixture,
    expect,
} from '@open-wc/testing';

import '../src/components/App.js';
import sinon from 'sinon';

let el,
    main;
describe('<app-component>', () => {
    before(async () => {
        // runs before all tests in this block
        el = await fixture('<app-component></app-component>');

        main = el.shadowRoot.querySelector('#main');
    });
    afterEach(() => {
        sinon.restore();
    })
    it('has a default page number', () => {
        expect(el.currentPageNumber).to.equal(1);
    });

    it('has a default search', () => {
        expect(el.currentSearchTerm).to.equal('');
    });

    it('should call searchMovies', () => {
        const updateSpy = sinon.spy(el, 'update');
        const movieSpy = sinon.spy(el, 'getMovies');
        el.searchMovies('Dracula');
        expect(el.currentSearchTerm).to.equal('Dracula');
        expect(el.currentPageNumber).to.equal(1);
        expect(movieSpy.callCount).to.equal(1);
        expect(updateSpy.callCount).to.equal(1);
    })

    it('should call update with list of movies', () => {
        const movies = [
            { "vote_count": 2250, "id": 6114, "video": false, "vote_average": 7.3, "title": "Dracula", "popularity": 12.734, "poster_path": "\/ioHxm3D3JdSXR61LRhcVb8KdZOz.jpg", "original_language": "en", "original_title": "Dracula", "genre_ids": [10749, 27], "backdrop_path": "\/x4RwLFKvVm5X6zkrKRLBUkDIwuq.jpg", "adult": false, "overview": "When Dracula leaves the captive Jonathan Harker and Transylvania for London in search of Mina Harker—the spitting image of Dracula's long-dead wife, Elisabeta—obsessed vampire hunter, Dr. Van Helsing sets out to end the madness.", "release_date": "1992-11-13" },
            { "vote_count": 469, "id": 138, "video": false, "vote_average": 7.2, "title": "Dracula", "popularity": 9.832, "poster_path": "\/hA9kQrIwDHJKl1pt8GpJdDnBzim.jpg", "original_language": "en", "original_title": "Dracula", "genre_ids": [27, 14], "backdrop_path": "\/z70kyHZcUmwED1p6KXyMjLlxfto.jpg", "adult": false, "overview": "The legend of vampire Count Dracula begins here with this original 1931 Dracula film starring Bela Lugosi.", "release_date": "1931-02-12" },
            { "vote_count": 195, "id": 11868, "video": false, "vote_average": 7.3, "title": "Dracula", "popularity": 7.156, "poster_path": "\/1L45hwUu1P4NRhbRRrE5d9oHamm.jpg", "original_language": "en", "original_title": "Dracula", "genre_ids": [27], "backdrop_path": "\/8Fi5uAQeOEKbgSYBnmN4FoIrO6O.jpg", "adult": false, "overview": "After Jonathan Harker attacks Dracula at his castle (apparently somewhere in Germany), the vampire travels to a nearby city, where he preys on the family of Harker's fiancée. The only one who may be able to protect them is Dr. van Helsing, Harker's friend and fellow-student of vampires, who is determined to destroy Dracula, whatever the cost.", "release_date": "1958-05-08" },
            { "vote_count": 79, "id": 33521, "video": false, "vote_average": 6.5, "title": "Dracula", "popularity": 6.077, "poster_path": "\/nS20AU8Iorb3nEJdIEpk4J0RR0j.jpg", "original_language": "en", "original_title": "Dracula", "genre_ids": [27, 10749], "backdrop_path": "\/uWF6NFQ8JySd4KSaX4JKEVYts06.jpg", "adult": false, "overview": "Romanticized adaptation of Bram Stoker's 1897 classic. Count Dracula is a subject of fatal attraction to more than one English maiden lady, as he seeks an immortal bride.", "release_date": "1979-07-20" }
        ];

        el.update(movies);
        const movieCardElements = main.querySelectorAll('movie-card');
        expect(movieCardElements.length).to.equal(4);
    })

    it('should clear movies', () => {
        el.update([]);
        expect(main.childNodes.length).to.equal(0);
    })

    it('should clear movies', () => {
        el.update([]);
        expect(main.childNodes.length).to.equal(0);
    })

    it('should load more movies', () => {
        
        const updateSpy = sinon.spy(el, 'update');
        const moviesResponse = { "page": 1, "total_results": 219, "total_pages": 11, "results": [{ "vote_count": 2250, "id": 6114, "video": false, "vote_average": 7.3, "title": "Dracula", "popularity": 12.734, "poster_path": "\/ioHxm3D3JdSXR61LRhcVb8KdZOz.jpg", "original_language": "en", "original_title": "Dracula", "genre_ids": [10749, 27], "backdrop_path": "\/x4RwLFKvVm5X6zkrKRLBUkDIwuq.jpg", "adult": false, "overview": "When Dracula leaves the captive Jonathan Harker and Transylvania for London in search of Mina Harker—the spitting image of Dracula's long-dead wife, Elisabeta—obsessed vampire hunter, Dr. Van Helsing sets out to end the madness.", "release_date": "1992-11-13" }] }
        
        el.loadMovies(moviesResponse);

        expect(el.lastPage).to.equal(false);
        expect(updateSpy.called).to.equal(true);
    })

    it('should load no more movies', () => {
        
        const updateSpy = sinon.spy(el, 'update');
        const moviesResponse = { "page": 1, "total_results": 219, "total_pages": 1, "results": [{ "vote_count": 2250, "id": 6114, "video": false, "vote_average": 7.3, "title": "Dracula", "popularity": 12.734, "poster_path": "\/ioHxm3D3JdSXR61LRhcVb8KdZOz.jpg", "original_language": "en", "original_title": "Dracula", "genre_ids": [10749, 27], "backdrop_path": "\/x4RwLFKvVm5X6zkrKRLBUkDIwuq.jpg", "adult": false, "overview": "When Dracula leaves the captive Jonathan Harker and Transylvania for London in search of Mina Harker—the spitting image of Dracula's long-dead wife, Elisabeta—obsessed vampire hunter, Dr. Van Helsing sets out to end the madness.", "release_date": "1992-11-13" }] }
        el.loadMovies(moviesResponse);
        expect(el.lastPage).to.equal(true);
        expect(updateSpy.called).to.equal(true);
    });

    it('infinite scroll should work', async () => {
        const scrollSpy = sinon.spy(window, 'addEventListener');        
        el.setUpInfiniteScroll();
        expect(scrollSpy.calledWith('scroll')).to.equal(true);
    });

    it('infinite scroll should load more movies', async () => {  
        const movieSpy = sinon.spy(el, 'getMovies');
        el.lastPage = false;   
        el.loadMoreMovies();
        expect(el.currentPageNumber).to.equal(2);
        expect(movieSpy.calledOnce).to.equal(true);
    });

    it('should react to search', async () => {  
        const searchSpy = sinon.spy(el.searchForm, 'addEventListener');        
        el.setUpSearch();
        expect(searchSpy.calledWith('search')).to.equal(true);
        const searchFormElements = el.shadowRoot.querySelectorAll(
            'search-form'
        );
        expect(searchFormElements.length).to.equal(1);
        const customEvent = await searchFormElements[0].dispatchEvent(
            new CustomEvent('search', {
                detail: {
                    searchTerm: 'Dracula'
                },
                bubbles: true
            })
        );
        if(customEvent) {
            expect(el.currentSearchTerm).to.equal('Dracula');
            expect(el.currentPageNumber).to.equal(1);
        }
    });

    it('should call get movies', async() => {
        const loadSpy = sinon.spy(el, 'loadMovies');    
        el.getMovies();
        expect(loadSpy.called).to.equal(true);
    })
});
