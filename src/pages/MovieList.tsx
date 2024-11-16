import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Star, Film } from 'lucide-react';
import { useMovieStore } from '../store/movieStore';

export function MovieList() {
  const { movies, selectMovie, selectedLanguage, setLanguage } = useMovieStore();
  const navigate = useNavigate();

  const languages = ['All', 'Hindi', 'Telugu', 'Tamil', 'Malayalam', 'Bengali', 'Punjabi', 'English'];

  const filteredMovies = selectedLanguage === 'All'
    ? movies
    : movies.filter(movie => movie.language === selectedLanguage);

  const handleMovieSelect = (movie: typeof movies[0]) => {
    selectMovie(movie);
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Now Showing</h1>
          <div className="flex items-center space-x-2 bg-white rounded-lg shadow p-2">
            <Film className="h-5 w-5 text-indigo-600" />
            <select
              value={selectedLanguage}
              onChange={(e) => setLanguage(e.target.value)}
              className="border-0 focus:ring-0 text-sm font-medium text-gray-700"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang} Movies
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => handleMovieSelect(movie)}
            >
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-bold text-gray-900">{movie.title}</h2>
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                    {movie.language}
                  </span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">{movie.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{movie.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span>{movie.rating}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {movie.genre.map((g) => (
                      <span
                        key={g}
                        className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMovies.length === 0 && (
          <div className="text-center py-12">
            <Film className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No movies found</h3>
            <p className="mt-1 text-sm text-gray-500">
              No movies available in {selectedLanguage}. Try selecting a different language.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}