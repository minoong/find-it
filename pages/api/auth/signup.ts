import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Data from '../../../lib/data';
import { StoredUserType } from '../../../types/user';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const userExist = Data.user.existEmail({ email: req.body.email });
    if (userExist) {
      res.statusCode = 409;
      res.json({ message: '중복임' });
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 12);
    const users = Data.user.getUserList();
    const userId = users.length === 0 ? 1 : users[users.length - 1].id + 1;

    const { email, firstName, lastName, birthday } = req.body;

    const user: StoredUserType = {
      id: userId,
      email,
      firstName,
      lastName,
      password: hashedPassword,
      birthday,
      profileImage: '/static/image/user/default_user_profile_image.jpg',
    };

    Data.user.saveUsers([...users, user]);

    // eslint-disable-next-line prefer-template
    const token = jwt.sign(('' + user.id) as string, process.env.JWT_SECRET as string);
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 5);

    res.setHeader('Set-Cookie', `name=${token};Expires=${expires.toUTCString()}; HttpOnly; Path=/`);

    const resUser: Partial<Pick<StoredUserType, 'password'>> = user;

    delete resUser.password;

    res.statusCode = 200;
    return res.send(resUser);
    // eslint-disable-next-line no-else-return
  } else {
    res.statusCode = 405;

    return res.end();
  }
};
