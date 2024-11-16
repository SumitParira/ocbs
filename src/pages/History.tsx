import React from 'react';
import { Clock } from 'lucide-react';
import { useHistoryStore } from '../store/historyStore';
import { useMovieStore } from '../store/movieStore';
import { useThemeStore } from '../store/themeStore';
import { Link } from 'react-router-dom';

export function History() {
  const { viewedMovies } = useHistoryStore();
  const { movies } = useMovieStore();
  const { isDarkMode } = useThemeStore();

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100'} py-8`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 mb-8">
          <Clock className="h-6 w-6" />
          <h1 className="text-3xl font-bold">Viewing History</h1>
        </div>

        <div className="space-y-6">
          {viewedMovies.map(({ movieId, timestamp }) => {
            const movie = movies.find((m) => m.id === movieId);
            if (!movie) return null;

            return (
              <Link
                key={`${movieId}-${timestamp}`}
                to={`/movie/${movieId}`}
                className={`block ${
                  isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
                } rounded-xl shadow-lg overflow-hidden transition-colors duration-200`}
              >
                <div className="flex items-center p-6">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="h-24 w-24 object-cover rounded-lg"
                  />
                  <div className="ml-6">
                    <h2 className="text-xl font-semibold">{movie.title}</h2>
                    <p className={`mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Viewed on {new Date(timestamp).toLocaleDateString()} at{' '}
                      {new Date(timestamp).toLocaleTimeString()}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {movie.genre.map((g) => (
                        <span
                          key={g}
                          className={`px-2 py-1 rounded-full text-xs ${
                            isDarkMode
                              ? 'bg-gray-700 text-gray-300'
                              : 'bg-indigo-100 text-indigo-800'
                          }`}
                        >
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}

          {viewedMovies.length === 0 && (
            <div className={`text-center py-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <Clock className="mx-auto h-12 w-12 mb-4" />
              <h3 className="text-lg font-medium">No viewing history</h3>
              <p className="mt-1">Movies you view will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}