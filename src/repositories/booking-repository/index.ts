import { prisma } from '@/config';
import { Booking } from '@prisma/client';

async function findBooking(userId: number) {
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

const bookingRepository = {
  findBooking,
  createBooking,
  findBookingByRoomId,
};

export default bookingRepository;
