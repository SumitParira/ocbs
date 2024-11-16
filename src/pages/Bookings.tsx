import React from 'react';
import { Ticket } from 'lucide-react';
import { useMovieStore } from '../store/movieStore';
import { useAuthStore } from '../store/authStore';

export function Bookings() {
  const { bookings, movies } = useMovieStore();
  const { user } = useAuthStore();

  const userBookings = bookings.filter((booking) => booking.userId === user?.id);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>
        <div className="space-y-6">
          {userBookings.map((booking) => {
            const movie = movies.find((m) => m.id === booking.movieId);
            const showTime = movie?.showTimes.find((st) => st.id === booking.showTimeId);

            return (
              <div
                key={booking.id}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <Ticket className="h-8 w-8 text-indigo-600" />
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">{movie?.title}</h2>
                      <p className="text-gray-500">
                        {showTime?.date} at {showTime?.time}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Booking ID</p>
                    <p className="font-mono text-gray-900">{booking.id}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  <div>
                    <p>Seats: {booking.seats}</p>
                    <p>Total Price: ${booking.totalPrice}</p>
                  </div>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                    Confirmed
                  </div>
                </div>
              </div>
            );
          })}
          {userBookings.length === 0 && (
            <div className="text-center py-12">
              <Ticket className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No bookings</h3>
              <p className="mt-1 text-sm text-gray-500">You haven't made any bookings yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}