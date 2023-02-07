import { prisma } from '@/config';

async function findBooking(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId,
    },
    select: {
      id: true,
      Room: true
    }, 
  });
}

const bookingRepository = {
  findBooking,
};

export default bookingRepository;