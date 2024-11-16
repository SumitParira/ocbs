import { create } from 'zustand';
import { Movie, Booking, ShowTime, SeatRow } from '../types';

const generateSeatMap = (): SeatRow[] => {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  return rows.map((row) => ({
    row,
    seats: Array.from({ length: 12 }, (_, i) => ({
      id: `${row}${i + 1}`,
      number: i + 1,
      status: Math.random() > 0.8 ? 'booked' : 'available',
      price: row < 'D' ? 15 : 12,
    })),
  }));
};

const generateShowTimes = (): ShowTime[] => {
  return [
    {
      id: 'st1',
      time: '14:30',
      date: '2024-03-20',
      availableSeats: 45,
      seatMap: generateSeatMap(),
    },
    {
      id: 'st2',
      time: '18:00',
      date: '2024-03-20',
      availableSeats: 30,
      seatMap: generateSeatMap(),
    },
    {
      id: 'st3',
      time: '21:30',
      date: '2024-03-20',
      availableSeats: 50,
      seatMap: generateSeatMap(),
    },
  ];
};

interface MovieState {
  movies: Movie[];
  bookings: Booking[];
  selectedMovie: Movie | null;
  selectedLanguage: string;
  bookTickets: (booking: Omit<Booking, 'id' | 'date'>) => void;
  selectMovie: (movie: Movie) => void;
  setLanguage: (language: string) => void;
}

export const useMovieStore = create<MovieState>((set) => ({
  movies: [
    {
      id: '1',
      title: 'RRR',
      image: 'https://images.unsplash.com/photo-1533488765986-dfa2a9939acd?auto=format&fit=crop&q=80&w=1000',
      description: 'A tale of two legendary revolutionaries and their journey far away from home.',
      duration: '3h 2min',
      genre: ['Action', 'Drama', 'Historical'],
      rating: 'UA',
      language: 'Telugu',
      showTimes: generateShowTimes(),
    },
    {
      id: '2',
      title: 'Inception',
      image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=1000',
      description: 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
      duration: '2h 28min',
      genre: ['Action', 'Sci-Fi', 'Thriller'],
      rating: 'UA',
      language: 'English',
      showTimes: generateShowTimes(),
    },
    {
      id: '3',
      title: 'Pathaan',
      image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=80&w=1000',
      description: 'An Indian spy takes on the leader of a group of mercenaries who have nefarious plans to target his homeland.',
      duration: '2h 46min',
      genre: ['Action', 'Thriller'],
      rating: 'UA',
      language: 'Hindi',
      showTimes: generateShowTimes(),
    },
    {
      id: '4',
      title: 'Jailer',
      image: 'https://images.unsplash.com/photo-1597002973885-8c90683fa6e0?auto=format&fit=crop&q=80&w=1000',
      description: "A retired jailer goes on a manhunt to find his son's killers. But the road leads him to a familiar, albeit dangerous place.",
      duration: '2h 48min',
      genre: ['Action', 'Drama'],
      rating: 'UA',
      language: 'Tamil',
      showTimes: generateShowTimes(),
    },
    {
      id: '5',
      title: 'Oppenheimer',
      image: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?auto=format&fit=crop&q=80&w=1000',
      description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.',
      duration: '3h',
      genre: ['Biography', 'Drama', 'History'],
      rating: 'R',
      language: 'English',
      showTimes: generateShowTimes(),
    },
  ],
  bookings: [],
  selectedMovie: null,
  selectedLanguage: 'All',

  bookTickets: (booking) => {
    set((state) => {
      const newBooking = {
        ...booking,
        id: Math.random().toString(36).substr(2, 9),
        date: new Date().toISOString(),
      };

      const updatedMovies = state.movies.map((movie) => {
        if (movie.id === booking.movieId) {
          return {
            ...movie,
            showTimes: movie.showTimes.map((st) => {
              if (st.id === booking.showTimeId) {
                return {
                  ...st,
                  availableSeats: st.availableSeats - booking.seats.length,
                  seatMap: st.seatMap.map((row) => ({
                    ...row,
                    seats: row.seats.map((seat) => ({
                      ...seat,
                      status: booking.seats.some((bs) => bs.id === seat.id)
                        ? 'booked'
                        : seat.status,
                    })),
                  })),
                };
              }
              return st;
            }),
          };
        }
        return movie;
      });

      return {
        movies: updatedMovies,
        bookings: [...state.bookings, newBooking],
      };
    });
  },

  selectMovie: (movie) => {
    set({ selectedMovie: movie });
  },

  setLanguage: (language) => {
    set({ selectedLanguage: language });
  },
}));