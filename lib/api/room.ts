import axios from '.';
import { RegisterRoomState } from '../../types/reduxState';
import { RoomType } from '../../types/room';
import { makeQueryString } from '../utils';

type GetRoomListAPIQuery = {
  location?: string | string[];
  checkInDate?: string | string[];
  checkOutDate?: string | string[];
  adultCount?: string | string[];
  childrenCount?: string | string[];
  infantsCount?: string | string[];
  latitude?: string | string[];
  longitude?: string | string[];
  limit?: string | string[];
  page?: string | string[];
};

export const registerRoomAPI = (body: RegisterRoomState & { hostId: number }) => axios.post('/api/rooms', body);

export const getRoomListAPI = (query: GetRoomListAPIQuery) => {
  return axios.get<RoomType[]>(makeQueryString('/api/rooms', query));
};
