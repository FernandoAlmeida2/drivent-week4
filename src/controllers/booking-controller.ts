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

  try {
    const bookingConfirmation = await bookingService.postBooking(userId, roomId);

    res.status(httpStatus.OK).send(bookingConfirmation);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === 'CannotBookingError') {
      res.sendStatus(httpStatus.FORBIDDEN);
    }
  }
}

export async function patchBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { bookingId } = req.params;
  const { roomId } = req.body as { roomId: number };

  try {
    const bookingUpdate = await bookingService.updateBooking(userId, Number(bookingId), roomId);

    res.status(httpStatus.OK).send(bookingUpdate);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === 'CannotUpdateError') {
      res.sendStatus(httpStatus.FORBIDDEN);
    }
  }
}
