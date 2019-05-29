import {
    html,
    fixture,
    expect,
  } from '@open-wc/testing';

import MovieService from './movies.service';

import sinon from 'sinon';

let movieService;
const apiKey = '3c1f8aab959f953c1304121c64fcea57',
      baseUrl = 'https://api.themoviedb.org/3';

const movieServiceUrl = (searchTerm, pageNumber=1 ) => {
  if(!searchTerm) {
    return `${baseUrl}/movie/now_playing?api_key=${apiKey}&page=${pageNumber}`;
  } else {
    return `${baseUrl}/search/movie?api_key=${apiKey}&query=${searchTerm}&page=${pageNumber}`;
  }
  
};
const mockResponse = { "page": 1, "total_results": 219, "total_pages": 1, "results": [{ "vote_count": 2250, "id": 6114, "video": false, "vote_average": 7.3, "title": "Dracula", "popularity": 12.734, "poster_path": "\/ioHxm3D3JdSXR61LRhcVb8KdZOz.jpg", "original_language": "en", "original_title": "Dracula", "genre_ids": [10749, 27], "backdrop_path": "\/x4RwLFKvVm5X6zkrKRLBUkDIwuq.jpg", "adult": false, "overview": "When Dracula leaves the captive Jonathan Harker and Transylvania for London in search of Mina Harker—the spitting image of Dracula's long-dead wife, Elisabeta—obsessed vampire hunter, Dr. Van Helsing sets out to end the madness.", "release_date": "1992-11-13" }] }

describe('Movie Service', async () => {
    before(()=> {
        movieService = new MovieService();
    })

    it('should search for movies', async() => {
        const fetchStub = sinon.stub(window, 'fetch').resolves(mockResponse);   
        movieService.search('Dracula', 1);
        expect(fetchStub.calledWith(movieServiceUrl('Dracula', 1))).to.equal(true);
    });
});