import { AuthenticatedRequest } from '@/middlewares';
import bookingService from '@/services/booking-service';
import { Response } from 'express';
import httpStatus from 'http-status';

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const booking = await bookingService.getBooking(userId);

    res.status(httpStatus.OK).send(booking);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
}

export async function postBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body as { roomId: number };
  if (!roomId) {
    res.sendStatus(httpStatus.BAD_REQUEST);
    return;
  }

  try {
    const bookingConfirmation = await bookingService.postBooking(userId, roomId);

    res.status(httpStatus.OK).send(bookingConfirmation);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === 'CannotBookingError') {
      res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }
  }
}
