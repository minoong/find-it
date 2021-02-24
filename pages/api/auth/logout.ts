import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'DELETE') {
      res.setHeader('Set-Cookie', 'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httpOnly');
      res.statusCode = 204;
      return res.end();
    }
  } catch (e) {
    console.error(e);
    return res.send(e.message);
  }

  res.statusCode = 405;
  return res.end();
};
