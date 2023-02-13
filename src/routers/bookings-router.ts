import { getBooking, postBooking, patchBooking } from '@/controllers';
import { authenticateToken, validateBody } from '@/middlewares';
import { bookingSchema } from '@/schemas';
import { Router } from 'express';

const bookingsRouter = Router();

bookingsRouter
  .all('/*', authenticateToken)
  .get('/', getBooking)
  .post('/', validateBody(bookingSchema), postBooking)
  .patch('/:bookingId', validateBody(bookingSchema), patchBooking);

export { bookingsRouter };
