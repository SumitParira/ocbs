export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Movie {
  id: string;
  title: string;
  image: string;
  description: string;
  duration: string;
  genre: string[];
  rating: string;
  language: string;
  showTimes: ShowTime[];
}

export interface ShowTime {
  id: string;
  time: string;
  date: string;
  availableSeats: number;
  seatMap: SeatRow[];
}

export interface SeatRow {
  row: string;
  seats: Seat[];
}

export interface Seat {
  id: string;
  number: number;
  status: 'available' | 'selected' | 'booked';
  price: number;
}

export interface Booking {
  id: string;
  userId: string;
  movieId: string;
  showTimeId: string;
  seats: BookedSeat[];
  totalPrice: number;
  date: string;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
}

export interface BookedSeat {
  id: string;
  row: string;
  number: number;
  price: number;
}

export type PaymentStatus = 'pending' | 'completed' | 'failed';
export type PaymentMethod = 'credit_card' | 'debit_card' | 'upi';