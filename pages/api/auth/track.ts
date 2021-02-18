import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { StoredUserType } from '../../../types/user';
import Data from '../../../lib/data';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const accessToken = req.headers.cookie;

      if (!accessToken) {
        res.statusCode = 400;
        return res.send('access_token not found.');
      }

      const userId = jwt.verify(accessToken, process.env.JWT_SECRET!);
      const user = Data.user.findUser({ id: Number(userId) }) as StoredUserType;
      console.log(userId, user);
      const pureUser: Partial<Pick<StoredUserType, 'password'>> = user;

      delete pureUser.password;

      res.statusCode = 200;
      return res.send(pureUser);
    } catch (error) {
      res.statusCode = 500;
      return res.send(error);
    }
  }

  res.statusCode = 405;
  return res.end();
};
