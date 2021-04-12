/* eslint-disable no-undef */
import { NextPage } from 'next';
import RoomMain from '../../components/room/main/RoomMain';
import { getRoomListAPI } from '../../lib/api/room';
import { roomActions } from '../../store/room';

const index: NextPage = () => {
  return <RoomMain />;
};

index.getInitialProps = async ({ store, query }) => {
  const {
    location,
    checkInDate,
    checkOutDate,
    adultCount,
    childrenCount,
    infantsCount,
    latitude,
    longitude,
    limit,
    page = '1',
  } = query;

  try {
    const { data } = await getRoomListAPI({
      checkInDate,
      checkOutDate,
      adultCount,
      childrenCount,
      infantsCount,
      latitude,
      longitude,
      limit: limit || '10',
      page: page || '1',
      location: query.location ? encodeURI(query.location as string) : undefined,
    });

    store.dispatch(roomActions.setRooms(data));
  } catch (e) {
    console.error(e);
  }

  console.log(query);
  return {};
};

export default index;
