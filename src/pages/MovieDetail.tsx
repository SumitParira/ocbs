import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Star, Calendar, Users } from 'lucide-react';
import { useMovieStore } from '../store/movieStore';
import { useAuthStore } from '../store/authStore';
import { useHistoryStore } from '../store/historyStore';
import { useThemeStore } from '../store/themeStore';
import { SeatMap } from '../components/SeatMap';
import { PaymentForm } from '../components/PaymentForm';
import { PaymentMethod } from '../types';

export function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { movies, bookTickets } = useMovieStore();
  const { isAuthenticated, user } = useAuthStore();
  const { addToHistory } = useHistoryStore();
  const { isDarkMode } = useThemeStore();
  const [selectedShowTime, setSelectedShowTime] = useState('');
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [showPayment, setShowPayment] = useState(false);

  const movie = movies.find((m) => m.id === id);
  
  useEffect(() => {
    if (movie) {
      addToHistory(movie.id);
    }
  }, [movie, addToHistory]);

  if (!movie) return <div>Movie not found</div>;

  const showTime = movie.showTimes.find((st) => st.id === selectedShowTime);

  const handleSeatSelect = (seatId: string) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );
  };

  const calculateTotal = () => {
    if (!showTime) return 0;
    return selectedSeats.reduce((total, seatId) => {
      const seat = showTime.seatMap
        .flatMap((row) => row.seats)
        .find((s) => s.id === seatId);
      return total + (seat?.price || 0);
    }, 0);
  };

  const handlePaymentComplete = (paymentMethod: PaymentMethod) => {
    if (!showTime || !user) return;

    const bookedSeats = selectedSeats.map((seatId) => {
      const seat = showTime.seatMap
        .flatMap((row) => row.seats)
        .find((s) => s.id === seatId);
      const row = showTime.seatMap.find((r) =>
        r.seats.some((s) => s.id === seatId)
      );
      return {
        id: seatId,
        row: row?.row || '',
        number: seat?.number || 0,
        price: seat?.price || 0,
      };
    });

    bookTickets({
      movieId: movie.id,
      showTimeId: showTime.id,
      userId: user.id,
      seats: bookedSeats,
      totalPrice: calculateTotal(),
      paymentStatus: 'completed',
      paymentMethod,
    });

    navigate('/bookings');
  };

  const handleProceedToPayment = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setShowPayment(true);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} py-8`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`bg-${isDarkMode ? 'gray-800' : 'white'} rounded-xl shadow-lg overflow-hidden`}>
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img
                className="h-96 w-full object-cover md:w-96"
                src={movie.image}
                alt={movie.title}
              />
            </div>
            <div className="p-8 flex-grow">
              <div className="flex justify-between items-start">
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {movie.title}
                </h1>
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {movie.rating}
                  </span>
                </div>
              </div>

              <p className={`mt-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {movie.description}
              </p>

              <div className={`mt-6 flex items-center space-x-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                <div className="flex items-center space-x-1">
                  <Clock className="h-5 w-5" />
                  <span>{movie.duration}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {movie.genre.map((g) => (
                    <span
                      key={g}
                      className={`px-3 py-1 rounded-full text-sm ${
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

              {!showPayment ? (
                <div className="mt-8">
                  <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                    Book Tickets
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Select Show Time
                      </label>
                      <select
                        value={selectedShowTime}
                        onChange={(e) => {
                          setSelectedShowTime(e.target.value);
                          setSelectedSeats([]);
                        }}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                          isDarkMode ? 'bg-gray-700 text-white border-gray-600' : ''
                        }`}
                      >
                        <option value="">Select a time</option>
                        {movie.showTimes.map((st) => (
                          <option key={st.id} value={st.id}>
                            {st.date} at {st.time} ({st.availableSeats} seats available)
                          </option>
                        ))}
                      </select>
                    </div>

                    {showTime && (
                      <>
                        <SeatMap
                          seatMap={showTime.seatMap}
                          selectedSeats={selectedSeats}
                          onSeatSelect={handleSeatSelect}
                          isDarkMode={isDarkMode}
                        />

                        <div className={`mt-6 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
                          <div className="flex justify-between items-center mb-4">
                            <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                              Selected Seats:
                            </span>
                            <span className="font-medium">
                              {selectedSeats.length} ({selectedSeats.join(', ')})
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-lg font-semibold">
                            <span>Total Amount:</span>
                            <span className="text-indigo-600">${calculateTotal()}</span>
                          </div>
                        </div>

                        <button
                          onClick={handleProceedToPayment}
                          disabled={selectedSeats.length === 0}
                          className={`w-full ${
                            isDarkMode 
                              ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                              : 'bg-indigo-600 text-white hover:bg-indigo-700'
                          } py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400`}
                        >
                          Proceed to Payment
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <PaymentForm
                  amount={calculateTotal()}
                  onPaymentComplete={handlePaymentComplete}
                  isDarkMode={isDarkMode}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}