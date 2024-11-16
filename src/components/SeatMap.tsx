import React from 'react';
import { SeatRow } from '../types';

interface SeatMapProps {
  seatMap: SeatRow[];
  selectedSeats: string[];
  onSeatSelect: (seatId: string) => void;
  isDarkMode: boolean;
}

export function SeatMap({ seatMap, selectedSeats, onSeatSelect, isDarkMode }: SeatMapProps) {
  return (
    <div className="mt-6">
      <div className="mb-4">
        <div className="flex items-center justify-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className={`w-6 h-6 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded`}></div>
            <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-indigo-500 rounded"></div>
            <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Selected</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gray-400 rounded"></div>
            <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Booked</span>
          </div>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <div className="inline-block min-w-full">
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} p-6 rounded-lg`}>
            <div className="mb-8 text-center">
              <div className={`w-1/2 h-2 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'} mx-auto rounded-lg mb-2`}></div>
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Screen</span>
            </div>

            <div className="space-y-4">
              {seatMap.map((row) => (
                <div key={row.row} className="flex items-center space-x-2">
                  <span className={`w-6 text-center font-medium ${isDarkMode ? 'text-white' : ''}`}>
                    {row.row}
                  </span>
                  <div className="flex space-x-2">
                    {row.seats.map((seat) => (
                      <button
                        key={seat.id}
                        onClick={() => seat.status === 'available' && onSeatSelect(seat.id)}
                        disabled={seat.status === 'booked'}
                        className={`
                          w-8 h-8 rounded-t-lg flex items-center justify-center text-sm font-medium
                          ${
                            seat.status === 'booked' 
                              ? 'bg-gray-400 cursor-not-allowed' 
                              : selectedSeats.includes(seat.id)
                              ? 'bg-indigo-500 text-white'
                              : isDarkMode
                              ? 'bg-gray-600 hover:bg-gray-500 text-white'
                              : 'bg-gray-200 hover:bg-gray-300'
                          }
                        `}
                      >
                        {seat.number}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}