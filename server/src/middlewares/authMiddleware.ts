import { expressjwt as jwt } from 'express-jwt';
import { Request, Response, NextFunction } from 'express';

export const authenticateJWT = jwt({
  secret: process.env.JWT_SECRET!,
  algorithms: ['HS256'],
  requestProperty: 'auth'
});
