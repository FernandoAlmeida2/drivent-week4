import { prisma } from '@/config';
import { Booking } from '@prisma/client';



async function findBookingById(bookingId: number) {
  return prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
  });
}

async function findBookingByUserId(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId,
    },
    select: {
      id: true,
      Room: true,
    },
  });
}

async function createBooking(userId: number, roomId: number) {
  return prisma.booking.create({
    data: {
      userId,
      roomId,
    },
  });
}

async function findBookingByRoomId(roomId: number) {
  return prisma.booking.findFirst({
    where: {
      roomId,
    },
  });
}

async function updateBookingRoom(bookingId: number, newRoomId: number) {
  return prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      roomId: newRoomId,
    },
  });
}

const bookingRepository = {
  findBookingById,
  findBookingByUserId,
  createBooking,
  findBookingByRoomId,
  updateBookingRoom,
};

export default bookingRepository;
