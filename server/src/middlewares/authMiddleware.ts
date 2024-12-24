// import { expressjwt as jwt } from 'express-jwt';
// import { Request, Response, NextFunction } from 'express';

// export const authenticateJWT = jwt({
//   secret: process.env.JWT_SECRET!,
//   algorithms: ['HS256'],
//   requestProperty: 'auth'
// });





import { User } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}


export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }

      req.user = user as User; // Now TypeScript knows `req.user` exists
      next();
    });
  } else {
    res.sendStatus(401); // Unauthorized
  }
};