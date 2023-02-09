import Joi from 'joi';

export const bookingSchema = Joi.object<{ roomId: number }>({
  roomId: Joi.number().integer().strict().required(),
});
