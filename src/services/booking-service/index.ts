import { notFoundError } from '@/errors';
import { cannotBookingError } from '@/errors/cannot-booking-error';
import { cannotUpdateError } from '@/errors/cannot-update-error';
import bookingRepository from '@/repositories/booking-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import roomRepository from '@/repositories/room-repository';
import ticketRepository from '@/repositories/ticket-repository';

async function getBooking(userId: number) {
  const booking = await bookingRepository.findBookingByUserId(userId);
  if (!booking) {
    throw notFoundError();
  }

  return booking;
}

async function postBooking(userId: number, roomId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw cannotBookingError();
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel || ticket.status !== 'PAID') {
    throw cannotBookingError();
  }

  const room = await roomRepository.findRoomById(roomId);
  if (!room) {
    throw notFoundError();
  }

  const isBookedRoom = await bookingRepository.findBookingByRoomId(roomId);
  if (isBookedRoom) {
    throw cannotBookingError();
  }

  const booking = await bookingRepository.createBooking(userId, roomId);
  return { bookingId: booking.id };
}

async function updateBooking(userId: number, bookingId: number, newRoomId: number) {
  const booking = await bookingRepository.findBookingById(bookingId);
  if (!booking || booking.userId !== userId) {
    throw cannotUpdateError('booking');
  }

  const roomExists = await roomRepository.findRoomById(newRoomId);
  if (!roomExists) {
    throw notFoundError();
  }

  const roomIsBooked = await bookingRepository.findBookingByRoomId(newRoomId);
  if (roomIsBooked) {
    throw cannotUpdateError('booking');
  }

  const bookingUpdated = await bookingRepository.updateBookingRoom(bookingId, newRoomId);
  return { bookingId: bookingUpdated.id };
}

const bookingService = {
  getBooking,
  postBooking,
  updateBooking,
};

export default bookingService;
