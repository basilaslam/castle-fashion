import { NextFunction, type Response, type Request } from 'express';
import { formatDate } from '../utils/utils';

/**
 * Sets the 'x-webcastle-datetime' header in the response to the current date and time in ISO format.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function in the chain.
 * @return {void} This function does not return anything.
 */
export const setDefaultDateTime = (req: Request, res: Response, next: NextFunction): void => {
    res.setHeader('x-webcastle-datetime', new Date().toISOString());
    next();
};
