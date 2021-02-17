import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Data from '../../../lib/data';
import { StoredUserType } from '../../../types/user';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      if (!email || !password) {
        res.statusCode = 400;
        return res.send('이메일, 패스워드를 입력해주세요.');
      }

      const user = Data.user.findUser({ email });

      if (!user) {
        res.statusCode = 404;
        return res.send('회원 정보를 확인해 주세요.');
      }

      const isPasswordMatched = bcrypt.compareSync(password, user.password);

      if (!isPasswordMatched) {
        res.statusCode = 403;
        return res.send('패스워드가 일치하지 않습니다.');
      }

      const token = jwt.sign((user.id as unknown) as string, process.env.JWT_SECRET as string);
      const expires = new Date();
      expires.setMinutes(expires.getMinutes() + 5);

      res.setHeader('Set-Cookie', `access_token=${token};Expires=${expires.toUTCString()}; HttpOnly; Path=/`);

      const pureUser: Partial<Pick<StoredUserType, 'password'>> = user;

      delete pureUser.password;

      res.statusCode = 200;
      return res.send(user);
    } catch (err) {
      console.error(err);
      res.statusCode = 500;
      return res.send(err);
    }
  }

  res.statusCode = 405;

  return res.end();
};
