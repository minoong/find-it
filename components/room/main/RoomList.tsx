/* eslint-disable react/jsx-boolean-value */
import React from 'react';
import styled from 'styled-components';
import { useSelector } from '../../../store';
import RoomCard from './RoomCard';

const RoomListBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: 3.125rem;
  width: 100%;
`;

const RoomList: React.FC = () => {
  const rooms = useSelector((state) => state.room.rooms);
  return (
    <RoomListBlock>
      {rooms.map((room) => (
        <RoomCard room={room} key={room.id} showMap={true} />
      ))}
    </RoomListBlock>
  );
};

export default RoomList;
