import { notFoundError } from '@/errors';
import { cannotBookingError } from '@/errors/cannot-booking-error';
import bookingRepository from '@/repositories/booking-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import hotelRepository from '@/repositories/hotel-repository';
import roomRepository from '@/repositories/room-repository';
import ticketRepository from '@/repositories/ticket-repository';

async function getBooking(userId: number) {
  const booking = await bookingRepository.findBooking(userId);
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

const bookingService = {
  getBooking,
  postBooking,
};

export default bookingService;
