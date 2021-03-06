import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
      res.statusCode = 400;
      return res.send('위치 정보가 없습니다.');
    }
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&language=ko&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`;
      console.log(url);
      const { data } = await axios.get(url);

      console.log('########', data);

      const addressComponent = data.results[0].address_components;
      const { lat, lng } = data.results[0].geometry.location;
      const result = {
        latitude: lat,
        longitude: lng,
        country: addressComponent[4].long_name,
        city: addressComponent[3].long_name,
        district: addressComponent[2].long_name,
        streetAddress: `${addressComponent[1].long_name} ${addressComponent[0].long_name}`,
        postcode: addressComponent[5].long_name,
      };

      res.statusCode = 200;
      return res.send(result);
    } catch (err) {
      res.statusCode = 404;
      return res.end();
    }
  }

  res.statusCode = 500;

  return res.end();
};
