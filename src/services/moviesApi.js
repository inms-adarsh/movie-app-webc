const apiKey = '3c1f8aab959f953c1304121c64fcea57',
      baseUrl = 'https://api.themoviedb.org/3';

const movieServiceUrl = (searchTerm, pageNumber=1 ) => {
  if(!searchTerm) {
    return `${baseUrl}/movie/now_playing?api_key=${apiKey}&page=${pageNumber}`;
  } else {
    return `${baseUrl}/search/movie?api_key=${apiKey}&query=${searchTerm}&page=${pageNumber}`;
  }
  
};

class MovieService {
  async search(searchTerm, pageNumber=1) {
    const res = await fetch(movieServiceUrl(searchTerm, pageNumber)),
    json = await res.json();
    return json;
  }
}
  
export { MovieService as default };
